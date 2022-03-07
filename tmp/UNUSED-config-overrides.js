module.exports = function override(config, env) {
  const swPrecacheConfig = config.plugins.find(
     plugin => plugin.constructor.name === "GenerateSW"
  );
  // prevent some URLs from being cached by the service worker
  const blacklist = swPrecacheConfig.config.navigateFallbackBlacklist;
  blacklist.push(/\/api\//);
  return config;
};
