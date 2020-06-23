type StringDictionary = { [key: string]: string };

// https://www.pubnub.com/docs/platform/events/functions/run-function#requestresponse-objects
declare namespace PNFunction {
  interface Request {
    message: object;
    verb: string;
    pubkey: string;
    subkey: string;
    version: string;
    meta: {
      clientip: string;
      origin: string;
      useragent: string;
    };
    params: StringDictionary;
    uri: string;
  }

  interface MessageRequest extends Request {
    ok: (message?: string) => Promise<MessageRequest>;
    abort: (message?: string) => Promise<MessageRequest>;
    channels: string[];
  }

  interface RestRequest extends Request {
    path: string;
    method: string;
    body: string | null;
    headers: StringDictionary;
  }

  interface RestResponse {
    send: (body?: string) => Promise<RestResponse>;
    headers: StringDictionary;
    status: number;
    body: object;
  }

  // a function running in response to some message (i.e. not OnRequest)
  type OnMessageFunction = (request: MessageRequest) => Promise<MessageRequest>;

  export type OnRequest = (
    request: RestRequest,
    response: RestResponse
  ) => Promise<RestResponse>;

  // aliases for different function types
  export type BeforePublish = OnMessageFunction;
  export type AfterPublish = OnMessageFunction;
  export type BeforeSignal = OnMessageFunction;
  export type AfterSignal = OnMessageFunction;
  export type AfterPresence = OnMessageFunction;
}

// https://www.pubnub.com/docs/platform/functions/xhr-module
declare module "xhr" {
  type HTTPMethod = "GET" | "POST" | "PUT" | "OPTIONS" | "DELETE" | "PATCH";

  type HTTPHeaders = StringDictionary;

  interface HTTPOptions {
    timeout?: number;
    method?: HTTPMethod;
    body?: string;
    headers?: HTTPHeaders;
  }

  interface HTTPResponse {
    url: string;
    headers: HTTPHeaders;
    body: string;
    status: number;
    statusText: string;
    ok: boolean;
    bodyUsed: boolean;
  }

  export const fetch: (
    url: string,
    options?: HTTPOptions
  ) => Promise<HTTPResponse>;
}

// https://www.pubnub.com/docs/platform/functions/kvstore-module
declare module "kvstore" {
  export const set: (key: string, value: object, ttl?: number) => void;

  export const setItem: (key: string, value: string, ttl?: number) => void;

  export const get: (key: string) => Promise<object>;

  export const getItem: (key: string) => Promise<string>;

  export const removeItem: (key: string) => void;

  export const getKeys: (pagination?: string) => Promise<string[]>;

  export const getCounter: (key: string) => Promise<number>;

  export const incrCounter: (key: string, amount?: number) => void;

  export const getCounterKeys: (pagination?: string) => Promise<string[]>;
}

// https://www.pubnub.com/docs/platform/functions/advanced-math-module
declare module "advanced_math" {
  export const getDistance: (
    lat1: number,
    long1: number,
    lat2: number,
    long2: number
  ) => number;

  export const deg2rad: (degrees: number) => number;
}

// https://www.pubnub.com/docs/platform/functions/crypto-module
declare module "crypto" {
  type Algorithm =
    | {
        scheme: string;
        curve: string;
        hash?: string;
      }
    | string;

  export const ALGORITHM: Algorithm[];

  export const hmac: (
    key: string,
    msg: string,
    algorithm: Algorithm
  ) => Promise<string>;

  export const sha1: (msg: string) => Promise<string>;

  export const sha256: (msg: string) => Promise<string>;

  export const sha512: (msg: string) => Promise<string>;

  // docs are not clear enough on the types for sign and verify
  export const sign: unknown;
  export const verify: unknown;
}

// https://www.pubnub.com/docs/platform/functions/utilities-module
declare module "utils" {
  export const randomInt: (min: number, max: number) => number;
  export const isNumeric: (variable: unknown) => boolean;
}

// https://www.pubnub.com/docs/platform/functions/codec-module
declare module "codec/auth" {
  export const basic: (username: string, password: string) => string;
}

declare module "codec/base64" {
  export const btoa: (unencoded: string) => string;

  export const atob: (encoded: string) => string;

  export const encodeString: (input: string) => string;
}

declare module "codec/query_string" {
  export const parse: (queryString: string, defaults: object) => object;

  export const stringify: (parameters: object) => string;
}

// https://www.pubnub.com/docs/platform/functions/vault-module
declare module "vault" {
  export const get: (key: string) => Promise<string>;
}
