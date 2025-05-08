const { Bixby, sleep } = require("../lib");
const { installPlugin, removePlugin, PluginDB } = require("../lib/db/plugins");
const axios = require("axios");

Bixby(
  {
    pattern: "install",
    fromMe: true,
    desc: "Installs External plugins",
    type: "user",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(message.jid, "_Send a plugin URL_");

    let url;
    try {
      url = new URL(match);
    } catch {
      return await message.sendMessage(message.jid, "_Invalid URL_");
    }

    if (url.host === "gist.github.com") {
      url.host = "gist.githubusercontent.com";
      url = url.toString() + "/raw";
    } else {
      url = url.toString();
    }

    try {
      const { data } = await axios.get(url);
      const commandMatch = data.match(/(?<=pattern:) ["'](.*?)["']/);
      let pluginName = commandMatch ? commandMatch[1].split(" ")[0] : "__" + Math.random().toString(36).substring(7);

      const success = await installPlugin(url, pluginName);
      if (!success) {
        return await message.sendMessage(message.jid, "_Plugin already installed_");
      }

      return await message.sendMessage(message.jid, `_Plugin installed: ${pluginName}_`);
    } catch (err) {
      console.error(err);
      return await message.sendMessage(message.jid, "Failed to install plugin:\n```" + err + "```");
    }
  }
);

Bixby(
  {
    pattern: "plugin",
    fromMe: true,
    desc: "List installed plugins",
    type: "user",
  },
  async (message) => {
    const plugins = await PluginDB.find();
    if (!plugins.length) {
      return await message.sendMessage(message.jid, "_No external plugins installed_");
    }

    const list = plugins.map(p => `\`${p.name}\`: ${p.url}`).join("\n");
    return await message.sendMessage(message.jid, list);
  }
);

Bixby(
  {
    pattern: "remove",
    fromMe: true,
    desc: "Remove external plugins",
    type: "user",
  },
  async (message, match) => {
    match = match || message.reply_message?.text;
    if (!match) return await message.sendMessage(message.jid, "_Provide plugin name to remove_");

    const removed = await removePlugin(match);
    if (!removed) {
      return await message.sendMessage(message.jid, "_Plugin not found_");
    }

    await message.sendMessage(message.jid, `Plugin \`${match}\` removed`);
    await message.sendMessage(message.jid, "_Restarting..._");
    await sleep(500);
    return process.send("reset");
  }
);
