const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

config.resolver.blockList = [
  new RegExp(`^${escapeForRegex(path.resolve(__dirname, ".codex"))}(?:[/\\\\].*)?$`),
  new RegExp(`^${escapeForRegex(path.resolve(__dirname, ".agents"))}(?:[/\\\\].*)?$`),
];

module.exports = withNativeWind(config, { input: "./global.css" });
