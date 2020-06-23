// these are NOT complete types, but represent the functionality needed to preview links
declare module "htmlparser" {
  export class Parser {
    constructor(handler: DefaultHandler);
    parseComplete(htlm: string): void;
  }

  export class DefaultHandler {
    constructor(
      callback: (error: unknown, dom: Node[]) => void,
      options?: { verbose?: boolean }
    );
  }

  export enum ElementType {
    Directive = "directive",
    Tag = "tag",
    Script = "script",
    Text = "text",
    Style = "style",
    Comment = "comment",
  }

  export interface AnyNode {
    type: ElementType;
    name: string;
  }

  export interface Directive extends AnyNode {
    type: ElementType.Directive;
    name: string;
    data: string;
  }

  export interface Attributes {
    [key: string]: string;
  }

  export interface Tag extends AnyNode {
    type: ElementType.Tag;
    name: string;
    attribs?: Attributes;
    children?: Node[];
  }

  export interface Script extends AnyNode {
    type: ElementType.Script;
    children?: [Text];
  }

  export interface Text extends AnyNode {
    type: ElementType.Text;
    data: string;
  }

  export interface Style extends AnyNode {
    type: ElementType.Style;
    attribs?: Attributes;
    children?: [Text];
  }

  export type Node = Directive | Tag | Script | Text | Style;
}
