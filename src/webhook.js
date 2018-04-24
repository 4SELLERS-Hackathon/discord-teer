const discord = require('discord.js');

const id = process.env.WEBHOOK_ID;
const token = process.env.WEBHOOK_TOKEN;

module.exports = new discord.WebhookClient(id, token);