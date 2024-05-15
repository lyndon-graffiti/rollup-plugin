import { createFilter } from "@rollup/pluginutils";

const emitFile = (options = {}) => {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "rollup-plugin-emit-file",
    version: "1.0.0",
    transform: (code, id) => {
      if (!filter(id)) {
        return null;
      }
      const parsed = this.parse(code);

      const source = `${code}\n\n${JSON.stringify(parsed, null, 2)}`;

      const fileName = id.split("/").pop();

      if (options.emitFile) {
        this.emitFile({
          type: "asset",
          fileName: fileName + ".txt",
          source,
        });
      }
      return {};
    },
  };
};

export default emitFile;
