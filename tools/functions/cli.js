const fs = require("file-system");
const path = require("path");
const fetch = require("node-fetch");
const parseArgs = require("minimist");
const rollup = require("rollup");
const prompt = require("prompts");
const symbols = require("log-symbols");
const dotenv = require("dotenv");
const expand = require("dotenv-expand");

const HandlerTypes = require("./handlerTypes");
const rollupConfig = require("./rollup.config");

const DATA = path.resolve(__dirname, ".cache");
const SESSION_FILE = path.resolve(DATA, "session.json");
const KEYSET_FILE = path.resolve(DATA, "keyset.json");
const MODULE_FILE = path.resolve(DATA, "module.json");
const HANDLERS_FILE = path.resolve(DATA, "handlers.json");
const ADMIN_API = "https://admin.pubnub.com/api/";
// enable to show ids (ids can be used as environment variables for CI/CD)
const SHOW_IDS = false;

const bold = (string) => `\u001b[1m${string}\u001b[0m`;

const persist = (file, data, name) => {
  fs.writeFileSync(file, JSON.stringify(data));
  console.log(`${symbols.success} ${name} saved.`);
};

const load = (file, name, validate, errorMessage) => {
  const rawdata = fs.readFileSync(file);
  const data = JSON.parse(rawdata);
  if (validate && !validate(data)) {
    console.log(`${symbols.error} ${errorMessage}`);
    fs.unlinkSync(file);
    throw new Error(`${name} validation failed`);
  } else {
    console.log(`${symbols.success} ${name} loaded.`);
  }
  return data;
};

const getSession = async () => {
  try {
    // check for previous session
    return load(
      SESSION_FILE,
      "Session",
      (session) => {
        const now = Math.floor(new Date().getTime() / 1000);
        // make sure there's enough time to upload
        return session.expires > now + 1e3 * 10;
      },
      "Session expired."
    );
  } catch (e) {
    // begin the login flow from the start
    const session = await login();
    persist(SESSION_FILE, session, "Session");
    return session;
  }
};

const login = async () => {
  try {
    const { email, password } = await getCredentials();
    const response = await fetch(`${ADMIN_API}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      const session = (await response.json()).result;
      return session;
    } else {
      throw new Error("Invalid response.");
    }
  } catch (e) {
    throw new Error("Login failed.");
  }
};

const getCredentials = async () => {
  // check in environment variables first
  if (process.env.PN_EMAIL && process.env.PN_PASSWORD) {
    console.log(`${symbols.success} Credentials found in environment.`);
    return {
      email: process.env.PN_EMAIL,
      password: process.env.PN_PASSWORD,
    };
  } else {
    // prompt user for credentials
    console.log(
      `${symbols.info} Uploading functions requires you to login to your PubNub account.`
    );
    console.log(
      `${symbols.warning} If you registered using SSO, use the 'forget password' link in the admin portal to setup a password for your account.`
    );
    console.log("");
    const answers = await prompt([
      {
        name: "email",
        type: "text",
        message: "Email",
      },
      {
        name: "password",
        type: "password",
        message: "Password",
      },
    ]);
    return answers;
  }
};

const listAccounts = async (session) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/accounts?user_id=${session.user_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Session-Token": session.token,
        },
      }
    );
    const accounts = (await response.json()).result.accounts;
    return accounts;
  } catch (e) {
    throw new Error("Unable to retrieve accounts.");
  }
};

const selectKeyset = async (apps) => {
  // early exit if the keyset is in the environment
  if (process.env.PN_KEYSET_ID && process.env.PN_APP_ID) {
    const app = apps.filter((app) => app.id.toString() === process.env.PN_APP_ID)[0];
    return app.keys.filter((key) => key.id.toString() === process.env.PN_KEYSET_ID)[0];
  }
  // if there's only 1 option, don't prompt user
  if (apps.length === 1 && apps.length.keys === 1 && !SHOW_IDS) {
    return apps[0].keys[0];
  }
  const { key } = await prompt([
    {
      name: "app",
      message: "Select an Application",
      type: "select",
      choices: apps.map((app) => ({ title: SHOW_IDS ? `${app.name} (${app.id})` : app.name, value: app })),
    },
    {
      name: "key",
      message: "Select a Key",
      type: "select",
      choices: (selectedApp) =>
        selectedApp.keys.map((key) => ({
          title: SHOW_IDS ? `${key.properties.name} (${key.id})` : key.properties.name,
          value: key,
        })),
    },
  ]);
  if (key.properties.is_demo) {
    console.log(
      `${symbols.info} DEMO KEY: For demo purposes, we automatically enable most features. This demo keyset is rate limited and not intended for development or production.`
    );
  }
  return key;
};

const selectAccount = async (accounts) => {
  // early exit if the account is in the environment
  if (process.env.PN_ACCOUNT_ID) {
    const account = accounts.filter(
      (account) => account.id.toString() === process.env.PN_ACCOUNT_ID
    )[0];
    return account;
  } else if (accounts.length === 1 && !SHOW_IDS) {
    // if there's only 1 option, don't prompt user
    return accounts[0];
  } else {
    const { account } = await prompt({
      name: "account",
      message: "Select an Account",
      type: "select",
      choices: accounts.map((account) => ({ title: SHOW_IDS ? `${account.email} (${account.id})` : account.email, value: account })),
    });
    return account;
  }
}

const getKeyset = async (session) => {
  // check for saved data
  try {
    return load(KEYSET_FILE, "Keyset");
  } catch (e) {
    const accounts = await listAccounts(session);
    const account = await selectAccount(accounts);
    const apps = await listApplications(session, account);
    // the keys could be taken from here instead of the populate script prompt
    const keyset = await selectKeyset(apps);
    persist(KEYSET_FILE, keyset, "Keyset");
    return keyset;
  }
};

const listApplications = async (session, account) => {
  try {
    const response = await fetch(`${ADMIN_API}/apps?owner_id=${account.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Session-Token": session.token,
      },
    });
    const applications = (await response.json()).result;
    return applications;
  } catch (e) {
    throw new Error("Unable to retrieve applications.");
  }
};

const createModule = async (session, keyset, name, description) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/v1/blocks/key/${keyset.id}/block`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": session.token,
        },
        body: JSON.stringify({
          key_id: keyset.id,
          name,
          description,
        }),
      }
    );
    if (response.ok) {
      const id = (await response.json()).payload.id;
      const modules = await listModules(session, keyset);
      console.log(`${symbols.success} Created module ${bold(name)}.`);
      return modules.filter((module) => module.id === id)[0];
    } else {
      throw new Error("Invalid response");
    }
  } catch (e) {
    throw new Error("Module creation failed.");
  }
};

const listModules = async (session, keyset) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/v1/blocks/key/${keyset.id}/block`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": session.token,
        },
      }
    );
    const modules = (await response.json()).payload;
    return modules;
  } catch (e) {
    throw new Error("Unable to retrieve modules.");
  }
};

const selectModule = async (modules) => {
  // early exit if the module is in the environment
  if (process.env.PN_MODULE_ID) {
    const module = modules.filter(
      (module) => module.id.toString() === process.env.PN_MODULE_ID
    )[0];
    return module;
  } else if (modules.length === 1 && !SHOW_IDS) {
    // if there's only 1 option, don't prompt user
    return modules[0];
  } else {
    const { module } = await prompt({
      name: "module",
      message: "Select a Module",
      type: "select",
      choices: modules.map((module) => ({ title: SHOW_IDS ? `${module.name} (${module.id})` : module.name, value: module })),
    });
    return module;
  }
};

const getModule = async (session, keyset) => {
  try {
    return load(MODULE_FILE, "Module");
  } catch (e) {
    const modules = await listModules(session, keyset);
    // if there are no existing modules create a new one
    let module;
    if (modules.length === 0) {
      module = await createModule(
        session,
        keyset,
        "Typescript Team Chat",
        "Created by functions CLI"
      );
    } else {
      module = await selectModule(modules);
    }
    persist(MODULE_FILE, module, "Module");
    return module;
  }
};

const startModule = async (session, keyset, module) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/v1/blocks/key/${keyset.id}/block/${module.id}/start`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": session.token,
          body: JSON.stringify({
            key_id: keyset.id,
            block_id: module.id,
            action: "start",
          }),
        },
      }
    );
    if (response.ok) {
      console.log(`${symbols.success} Restarted ${bold(module.name)}.`);
      return;
    } else {
      throw new Error("Invalid response");
    }
  } catch (e) {
    throw new Error("Unable to restart module.");
  }
};

const getHandlers = async (session, keyset, module, events) => {
  try {
    return load(
      HANDLERS_FILE,
      "Handlers",
      (handlers) => {
        return events
          .map(({ name }) => handlers.hasOwnProperty(name))
          .reduce((a, b) => a && b);
      },
      "Handlers out of sync. Wiping local copy."
    );
  } catch (e) {
    const allHandlers = await listHandlers(session, keyset, module);
    // organize by name (which is unique)
    const handlersByName = allHandlers.reduce((byName, handler) => {
      byName[handler.name] = handler;
      return byName;
    }, {});

    const relevantHandlers = await Promise.all(
      events.map(async (event) => {
        // if the handler is missing, create it
        if (!handlersByName.hasOwnProperty(event.name)) {
          return await createHandler(
            session,
            keyset,
            module,
            placeholderHandler(event)
          );
        } else {
          // use existing handlers when possible
          return handlersByName[event.name];
        }
      })
    );

    // only track the handlers that are used
    // name is used as a key isntead of file because there are cases where one would want multiple blocks useing the same file
    const relevantByName = relevantHandlers.reduce(
      (byName, { code: _code, ...handler }) => {
        // discard the code before saving
        byName[handler.name] = handler;
        return byName;
      },
      {}
    );

    persist(HANDLERS_FILE, relevantByName, "Handlers");
    return relevantByName;
  }
};

const getCode = (file) => {
  return fs
    .readFileSync(path.resolve(__dirname, "../functions/build", file))
    .toString();
};

const placeholderHandler = (event) => {
  // use when creating an event handler
  const warning = "Function code has not been uploaded. Try 'npm run upload'.";
  const placeholders = {
    default: `module.exports = (request) => { console.warn("${warning}"); return request.ok() }`,
    onRequest: `module.exports = (request) => { console.warn("${warning}"); return response.send("${warning}") }`,
  };
  return {
    name: event.name,
    event: event.run,
    at: event.subscribeTo || event.path,
    code:
      event.run === HandlerTypes.onRequest
        ? placeholders.onRequest
        : placeholders.default,
  };
};

// at is the channel or path depending on type
const buildHandlerOptions = ({ name, code, event, at }) => {
  return {
    name,
    code,
    event,
    log_level: "debug",
    type: "js",
    output: `${name.replace(" ", "-")}-debug-console`,
    ...(event === HandlerTypes.onRequest ? { path: at } : { channels: at }),
  };
};

const createHandler = async (session, keyset, module, options) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/v1/blocks/key/${keyset.id}/event_handler`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": session.token,
        },
        body: JSON.stringify({
          key_id: keyset.id,
          block_id: module.id,
          ...buildHandlerOptions(options),
        }),
      }
    );
    if (response.ok) {
      const handler = (await response.json()).payload;
      console.log(`${symbols.success} Created ${bold(options.name)}.`);
      return handler;
    } else {
      throw new Error("Invalid response");
    }
  } catch (e) {
    throw new Error("Event handler creation failed.");
  }
};

const updateHandler = async (
  session,
  keyset,
  module,
  handler,
  event,
  newContent
) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/v1/blocks/key/${keyset.id}/event_handler/${handler.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": session.token,
        },
        body: JSON.stringify({
          key_id: keyset.id,
          block_id: module.id,
          id: handler.id,
          ...buildHandlerOptions({
            name: event.name,
            event: event.run,
            at: event.path || event.subscribeTo,
            code: newContent,
          }),
        }),
      }
    );
    if (response.ok) {
      const handler = (await response.json()).payload;
      console.log(`${symbols.success} Updated ${bold(event.name)}.`);
      return handler;
    } else {
      const error = await response.json();
      console.error(
        `${symbols.error} Unable to update ${bold(event.name)}: ${
          error.message
        }.`
      );
      throw new Error("Invalid response");
    }
  } catch (e) {
    throw new Error("Event handler update failed.");
  }
};

const listHandlers = async (session, keyset, module) => {
  try {
    const response = await fetch(
      `${ADMIN_API}/v1/blocks/key/${keyset.id}/block/${module.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": session.token,
        },
      }
    );
    const handlers = (await response.json()).payload[0].event_handlers;
    return handlers;
  } catch (e) {
    throw new Error("Unable to retrive handlers.");
  }
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  // config is required to run
  if (!args.config) {
    console.error(`${symbols.error} Missing required option --config.`);
  }
  // config is relative to working directory
  const configPath = path.resolve(process.cwd(), args.config);
  const config = require(configPath);
  const rootDir = path.dirname(path.resolve(configPath, config.rootDir));
  const { functions, ...options } = config;
  try {
    if (args.build) {
      // get environment variables that start with FUNCTIONS_
      const fullEnv = (expand(dotenv.config())).parsed || {};
      const env = Object.keys(fullEnv)
        .filter((key) => key.startsWith("FUNCTIONS_"))
        .reduce((object, key) => {
          object[`process.env.${key}`] = `"${fullEnv[key]}"`;
          return object;
        }, {});
      // rollup the source
      const { output: outputOptions, ...inputOptions } = rollupConfig(
        {
          ...options,
          rootDir,
        },
        env
      );
      // prevent logging the same error twice
      let lastError;
      await Promise.all(
        functions.map(async (handler) => {
          try {
            const bundle = await rollup.rollup({
              ...inputOptions,
              input: path.resolve(rootDir, options.sourceDir, handler.source),
            });
            await bundle.write({
              ...outputOptions,
              file: path.resolve(rootDir, options.buildDir, handler.build),
            });
            console.log(`${symbols.success} Rebuilt ${bold(handler.name)}`);
          } catch (error) {
            // due to how rollup handles errors (rejecting a promise), only 1 error per build will be logged
            console.error(
              `${symbols.error} Error building functions from source.`
            );
            if (error.loc) {
              const {
                message,
                pluginCode,
                frame,
                loc: { file, line, column },
              } = error;
              const errorLocation = `${file}:${line}:${column}`;
              if (errorLocation !== lastError) {
                lastError = errorLocation;
                console.error(
                  `${symbols.error} ${pluginCode}: ${errorLocation} ${frame} ${message}`
                );
              }
            } else {
              console.error(`${symbols.error} ${error.message || error}`);
            }
            throw new Error("Build failed.");
          }
        })
      );
    }
    if (args.init || args.upload) {
      // login or read from disk
      const session = await getSession();
      // get from API or read from disk
      const keyset = await getKeyset(session);
      // get from API or read from disk, creating a module if needed
      const module = await getModule(session, keyset);
      // get the event handlers for the specified functions
      const handlers = await getHandlers(session, keyset, module, functions);
      if (args.upload) {
        // update all the handlers with the content of the files on disk
        await Promise.all(
          functions.map((settings) => {
            const handler = handlers[settings.name];
            const code = getCode(
              path.resolve(rootDir, options.buildDir, settings.build)
            );
            return updateHandler(
              session,
              keyset,
              module,
              handler,
              settings,
              code
            );
          })
        );
        // restart the module to run latest version of code
        await startModule(session, keyset, module);
      }
    }
    process.exit(0);
  } catch (e) {
    console.error(`${symbols.error} ${e.message || "Unknown failure."}`);
    process.exit(1);
  }
};

main();
