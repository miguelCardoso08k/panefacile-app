const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /.*[/\\]\.codex(?:[/\\].*)?$/,
  /.*[/\\]\.agents(?:[/\\].*)?$/,
];

module.exports = withNativeWind(config, { input: "./global.css" });
