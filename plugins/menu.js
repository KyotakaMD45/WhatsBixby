/* Copyright (C) 2025 Codex.
Licensed under the MIT License;
you may not use this file except in compliance with the License.
Codex - Ziyan
*/

/* Copyright (C) 2025 Codex.
Licensed under the MIT License;
you may not use this file except in compliance with the License.
Codex - Ziyan
*/

const plugins = require("../lib/events");
const { Bixby, isPrivate } = require("../lib");
const { FancyRandom, getTimeByJid } = require("../lib/functions");
const { BOT_NAME, OWNER_NAME, WORK_TYPE, BOT_IMG } = require("../config");

Bixby(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match) => {
    try {
      if (match) {
        // Handle matched command logic here if needed
      } else {
        const { prefix } = message;
        const stars = ['☼︎','★','✦','✬','⁂','✢','✣','✥','✲','⌤','⇵','⟺','⍩','∞','⍙','⌭','⌮','〶','㊋'];
        const star = stars[Math.floor(Math.random() * stars.length)];

        // Get date/time based on user's jid
        const { date, time, timezone } = getTimeByJid(message.jid);

        let menu = `╭═══〘 ${BOT_NAME} 〙═══⊷❍
┃${star}╭──────────────
┃${star}│ Time: ${time}
┃${star}│ Date: ${date}
┃${star}│ Timezone: ${timezone}
┃${star}│ Owner: ${OWNER_NAME}
┃${star}│ User: ${message.pushName}
┃${star}│ Mode: ${WORK_TYPE}
┃${star}│ Version: 2.0.1
┃${star}│
┃${star}│  ▎▍▌▌▉▏▎▌▉▐▏▌▎
┃${star}│  ${BOT_NAME}
┃${star}╰───────────────
╰══════════════════⊷❍`;

        const randomFont = FancyRandom();
        await message.client.sendMessage(
          message.jid,
          {
            image: { url: BOT_IMG },
            caption: randomFont(menu.toUpperCase()),
          },
          { quoted: message }
        );
      }
    } catch (error) {
      console.error("[Error]:", error);
    }
  }
);


Bixby(
  {
    pattern: "list",
    fromMe: true,
    desc: "Show All Commands",
    type: "user",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    try {
      let menu = `╭────────────────╮
    ＷＨＡＴＳ ＢＩＸＢＹ
╰────────────────╯
╭────────────────
`;
      let cmnd = [];
      let cmd, desc;
      plugins.commands.map((command) => {
        if (command.pattern) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }
        desc = command.desc || false;

        if (!command.dontAddCommandList && cmd !== undefined) {
          cmnd.push({ cmd, desc });
        }
      });
      cmnd.sort();
      cmnd.forEach(({ cmd, desc }, num) => {
        menu += `│ \`\`\`${cmd}\`\`\`\n`;
      });
      menu += `╰────────────────`;
      let fin = menu.toUpperCase();
      const randomFont = FancyRandom();
      return await message.client.sendMessage(message.jid, { text: randomFont(fin) });
    } catch (error) {
      console.error("[Error]:", error);
    }
  }
);
