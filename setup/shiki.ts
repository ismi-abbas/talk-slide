/* ./setup/shiki.ts */
import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: "catppuccin-mocha",
      light: "catppuccin-mocha",
    },
    transformers: [],
  };
});
