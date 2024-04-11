import type { StorybookConfig } from "@storybook/nextjs";

const path = require("path");

const config: StorybookConfig = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  staticDirs: ["../public"],

  docs: {
    autodocs: "tag",
  },

  webpackFinal: async (config: any) => {
    // config.resolve.alias["next/router"] = require.resolve(
    //   "../__mocks__/next/router.tsx",
    // );
    config.resolve.alias["@api"] = path.resolve("./api");
    config.resolve.alias["@config"] = path.resolve("./config");
    config.resolve.alias["@features"] = path.resolve("./features");
    config.resolve.alias["@styles"] = path.resolve("./styles");
    config.resolve.alias["@typings"] = path.resolve("./typings");
    return config;
  },
};

export default config;
