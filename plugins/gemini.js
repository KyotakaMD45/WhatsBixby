const fs = require("fs");
const { Bixby, isPrivate } = require("../lib");
const { GEMINI_API } = require("../config"); 
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: GEMINI_API });

Bixby(
  {
    pattern: "gemini",
    fromMe: isPrivate,
    desc: "Generate text with Gemini",
  },
  async (message, match, m) => {
    if (!GEMINI_API) return console.log("Please add GEMINI_API");
    match = match || (message.reply_message && message.reply_message.text);
    if (!match) return await message.reply("_Provide a prompt_");
    const result = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: match,
    });
    const ctx = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "yh neh";
    await message.reply(ctx);
  }
);
