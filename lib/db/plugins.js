const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Root-level plugin directory
const pluginDir = path.join(__dirname, "../../plugins");
if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir, { recursive: true });

const PluginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const PluginDB = mongoose.model("Plugin", PluginSchema);

async function installPlugin(url, name) {
  const existing = await PluginDB.findOne({ url });
  if (existing) return false;

  const pluginPath = path.join(pluginDir, `${name}.js`);
  try {
    const { data } = await axios.get(url);
    fs.writeFileSync(pluginPath, data);
    require(pluginPath);
    await PluginDB.create({ name, url });
    return true;
  } catch (err) {
    if (fs.existsSync(pluginPath)) fs.unlinkSync(pluginPath);
    throw err;
  }
}

async function removePlugin(name) {
  const pluginPath = path.join(pluginDir, `${name}.js`);
  const plugin = await PluginDB.findOne({ name });
  if (!plugin) return false;

  await PluginDB.deleteOne({ name });

  if (fs.existsSync(pluginPath)) {
    delete require.cache[require.resolve(pluginPath)];
    fs.unlinkSync(pluginPath);
  }

  return true;
}

async function getandRequirePlugins() {
  const plugins = await PluginDB.find();
  for (const plugin of plugins) {
    const pluginPath = path.join(pluginDir, `${plugin.name}.js`);
    try {
      const { data } = await axios.get(plugin.url);
      fs.writeFileSync(pluginPath, data);
      require(pluginPath);
      console.log("Installed plugin:", plugin.name);
    } catch (err) {
      console.error("Error loading plugin:", plugin.name, err);
    }
  }
}

module.exports = { PluginDB, installPlugin, removePlugin, getandRequirePlugins };
