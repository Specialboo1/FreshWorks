"use strict";

const fs = require("fs");
const path = require("path");
const paths = require("./paths");
const chalk = require("react-dev-utils/chalk");
const resolve = require("resolve");

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return "";
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  // Allow the user to set the `baseUrl` to `appSrc` or `public` (or others)
  if (path.relative(paths.appSrc, baseUrlResolved) === "") {
    return [paths.appSrc];
  }

  // Allow resolving from the root directory and other custom directories outside src/
  if (path.relative(paths.appPath, baseUrlResolved) === "") {
    return [paths.appPath]; // Root directory or other custom path
  }

  // Default to node_modules resolution
  if (path.relative(paths.appNodeModules, baseUrlResolved) === "") {
    return null;
  }

  throw new Error(
    chalk.red.bold(
      "Your project's `baseUrl` can only be set to `src`, `node_modules`, or custom paths such as the root directory."
    )
  );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  const aliases = {};

  // Check if baseUrl is the root directory, add alias for root
  if (path.relative(paths.appPath, baseUrlResolved) === "") {
    aliases["@root"] = paths.appPath; // Alias for the root directory
  }

  // Check if baseUrl is the src directory, add alias for src
  if (path.relative(paths.appSrc, baseUrlResolved) === "") {
    aliases["@src"] = paths.appSrc; // Alias for the src directory
  }

  return aliases;
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  const aliases = {};

  // Jest alias for the root directory
  if (path.relative(paths.appPath, baseUrlResolved) === "") {
    aliases["^@root/(.*)$"] = "<rootDir>/$1";
  }

  // Jest alias for the src directory
  if (path.relative(paths.appSrc, baseUrlResolved) === "") {
    aliases["^@src/(.*)$"] = "<rootDir>/src/$1";
  }

  return aliases;
}

function getModules() {
  // Check if TypeScript is setup
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  const hasJsConfig = fs.existsSync(paths.appJsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      "You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file."
    );
  }

  let config;

  // If there's a tsconfig.json we assume it's a
  // TypeScript project and set up the config
  // based on tsconfig.json
  if (hasTsConfig) {
    const ts = require(resolve.sync("typescript", {
      basedir: paths.appNodeModules,
    }));
    config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
    // Otherwise we'll check if there is jsconfig.json
    // for non TS projects.
  } else if (hasJsConfig) {
    config = require(paths.appJsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths: additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

module.exports = getModules();
