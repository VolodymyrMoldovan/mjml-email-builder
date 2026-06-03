declare module 'mjml-browser' {
  interface MJMLParseResults {
    html: string;
    errors: Array<{
      line: number;
      message: string;
      tagName: string;
      formattedMessage: string;
    }>;
  }

  interface MJMLParsingOptions {
    fonts?: Record<string, string>;
    keepComments?: boolean;
    beautify?: boolean;
    minify?: boolean;
    validationLevel?: 'strict' | 'soft' | 'skip';
    filePath?: string;
    preprocessors?: Array<(xml: string) => string>;
  }

  function mjml2html(mjml: string, options?: MJMLParsingOptions): Promise<MJMLParseResults>;

  export default mjml2html;
}
