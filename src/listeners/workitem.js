const webhook = require('../webhook');

const anonymizeName = require('../helpers/anonymizeName');
const url = require('../helpers/url');

module.exports = ({ message, resource }) => {
  const fields = resource.fields;

  webhook.send({
    embeds: [
      {
        color: 0xFFA500,
        title: `🔥 ${fields['System.Title']}`,
        description: `[${fields['System.WorkItemType']} #${resource.id}](${url(message.markdown)}), created by ${anonymizeName(fields['System.CreatedBy'])}`
      }
    ]
  });
};