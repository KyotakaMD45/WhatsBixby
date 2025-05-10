const { getFilter, setFilter, deleteFilter } = require("../lib/db/filters");
const { Bixby } = require("../lib");

Bixby(
  {
    pattern: "filter",
    fromMe: true,
    desc: "Adds a filter. When someone triggers the filter, it sends the corresponding response. To view your filter list, use `.filter`.",
    usage: ".filter keyword:message",
    type: "group",
  },
  async (message, match) => {
    try {
      if (!match) {
        const filters = await getFilter(message.jid);
        if (!filters || filters.length === 0) {
          return await message.reply("No filters are currently set in this chat.");
        }
        
        const response = [
          "Your active filters for this chat:\n",
          ...filters.map(filter => `✒ ${filter.pattern}`),
          "\nUse: .filter keyword:message to set a filter"
        ].join("\n");
        
        return await message.reply(response);
      }

      const [text, msg] = match.split(":");
      if (!text || !msg) {
        return await message.reply("```use : .filter keyword:message\nto set a filter```");
      }
      await setFilter(message.jid, text, msg, true);
      return await message.reply(`_Successfully set filter for ${text}_`);
    } catch (error) {
      console.error("Filter command error:", error);
      await message.reply("An error occurred while processing your request.");
    }
  }
);

Bixby(
  {
    pattern: "stop",
    fromMe: true,
    desc: "Stops a previously added filter.",
    usage: '.stop "hello"',
    type: "group",
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.reply("\n*Example:* ```.stop hello```");
      }

      const deleted = await deleteFilter(message.jid, match);
      if (deleted) {
        await message.reply(`_Filter ${match} deleted_`);
      } else {
        await message.reply("No existing filter matches the provided input.");
      }
    } catch (error) {
      console.error("Stop command error:", error);
      await message.reply("An error occurred while deleting the filter.");
    }
  }
);

Bixby(
  { 
    on: "text", 
    fromMe: false 
  }, 
  async (message, match) => {
    try {
      const filters = await getFilter(message.jid);
      if (!filters) return;

      for (const filter of filters) {
        const rawPattern = filter.dataValues.pattern.trim();
        const isRegex = filter.dataValues.regex;
        
        const pattern = new RegExp(
          isRegex
            ? rawPattern
            : `\\b(${rawPattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`,
          "gm"
        );

        if (pattern.test(match)) {
          await message.reply(filter.dataValues.text, { quoted: message });
        }
      }
    } catch (error) {
      console.error("Filter trigger error:", error);
    }
  }
);
