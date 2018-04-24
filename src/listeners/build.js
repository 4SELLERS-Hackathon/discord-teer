const discord = require('discord.js');
const webhook = require('../webhook');

const anonymizeName = require('../helpers/anonymizeName');
const url = require('../helpers/url');

const errorEmojis = [
  ':worried:', ':thinking:', ':flushed:', ':poop:', ':confused:', ':sob:', ':zipper_mouth:', ':head_bandage:', 
  ':liar:', ':facepalm:', ':shrug:', ':bug:', ':beetle:', ':fire:', ':anger:', ':bomb:'
];

const errorEmoji = () => {
  return errorEmojis[Math.floor(Math.random() * errorEmojis.length)];
}

const statusToEmoji = (status) => {
  switch (status) {
    case 'succeeded': return '✅';
    case 'failed': return '⛔';
    case 'stopped': return '🛑';
  }
}

const statusToColor = (status) => {
  switch (status) {
    case 'succeeded': return 0x008000;
    case 'stopped': return 0xdd2e44;
    case 'failed': return 0xbe1931;
    default: return null;
  }
}

const requesters = (requests) => {
  return requests.map(r => anonymizeName(r.requestedFor.displayName)).join(', ');
}

const parseErrors = (message) => {
  const errorRe = /\+\s(.*)/g;
  const errors = [];
  let error; 

  while ((error = errorRe.exec(message)) !== null) {
    errors.push('- ' + error[1]);
  }

  var errorMessage = errors.join('\n');
  if (errorMessage.length > 200) {
    return errorMessage.substring(0, 197) + '...';
  }
  
  return errorMessage;
}

module.exports = ({ message, detailedMessage, resource }) => {
  const embed = new discord.RichEmbed({
    color: statusToColor(resource.status),
    title: `${statusToEmoji(resource.status)} ${resource.buildNumber} ${resource.status}`,
    description: `[Details](${url(message.markdown)}), requested for ${requesters(resource.requests)}`
  });

  const errors = parseErrors(detailedMessage.markdown);
  if (errors) {
    embed.addField(`Errors ${errorEmoji()}`, errors);
  }

  webhook.send({ embeds: [embed] });
};