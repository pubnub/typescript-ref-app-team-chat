// although there are faster parsers than htmlparser, they add too much to the bundle
import {
  Parser,
  DefaultHandler,
  Node,
  Text,
  Tag,
  ElementType,
} from "htmlparser";

// parse HTML string to AST
export const parseHtml = (html: string): Promise<Tag> => {
  return new Promise((resolve, reject) => {
    const handler = new DefaultHandler(
      (error, dom) => {
        error
          ? reject(error)
          : resolve({ type: ElementType.Tag, name: "#root", children: dom });
      },
      { verbose: false }
    );
    const parser = new Parser(handler);
    parser.parseComplete(html);
  });
};

// set of entities to decode
const entities = {
  "&": ["amp", "AMP", "#x0026", "#38", "#038"],
  '"': ["quot", "QUOT", "#x00022", "#34", "#034"],
  "'": ["apos", "#x00027", "#39", "#039"],
};

// decode most common entities
// supporting all entities would add over 20kb to the bundle
export const decodeHtml = (s: string): string => {
  return Object.keys(entities).reduce((decoded, replace) => {
    const sequences = entities[replace];
    return decoded.replace(
      new RegExp(`(&(?:${sequences.join("|")});)`, `g`),
      replace
    );
  }, s);
};

// helpers for working with AST from htmlparser
const isTextNode = (node: Node): node is Text => {
  return node.type === ElementType.Text;
};

const isTagNode = (node: Node): node is Tag => {
  return node.type === ElementType.Tag;
};

export const getTags = (node: Tag, tagName: string): Tag[] =>
  (node.children || [])
    .filter(isTagNode)
    .filter((node) => node.name === tagName);

export const getTag = (node: Tag, tagName: string): Tag =>
  getTags(node, tagName)[0];

export const getText = (node: Tag): string =>
  node?.children ? node.children.filter(isTextNode)[0].data : "";

export const attributes = (node: Tag): { [key: string]: string } =>
  node.attribs || {};
