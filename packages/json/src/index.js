import { createFilter } from "@rollup/pluginutils";
import path from "path";

const json = (options = {}) => {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "rollup-plugin-json",
    version: "1.0.0",
    transform: {
      order: "pre",
      handler(code, id) {
        if (!filter(id) || path.extname(id) !== ".json") {
          return null;
        }
        try {
          const parse = JSON.stringify(JSON.parse(code));
          return {
            // dataToEsm 将数据转换成 esm 模块
            // 其实就是 export default "xxx"
            code: dataToEsm(parse),
            map: { mappings: "" },
          };
        } catch (err) {
          const message = "Could not parse JSON file";
          this.error({ message, id, cause: err });
          return null;
        }
      },
    },
  };
};

export default json;
