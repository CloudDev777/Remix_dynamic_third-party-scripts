import type { Options } from "tsup";

export const tsup: Options = {
  entry: ["./index.ts", "./src/injectScripts.ts", "./src/useDynamicScripts.ts"],
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  dts: true,
  splitting: false,
};
