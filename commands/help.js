exports.run = async (bot, ctx, args) => {
  const myCommands = bot.commands;
  let currentCategory = "";
  let output = "";
  const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
  sorted.forEach(c => {
      const cat = c.help.category;
      if (currentCategory !== cat) {
          output += `\n**${cat}**\n`;
          currentCategory = cat;
      }
      output += `\`${c.help.name}\`, `;
  });
  const data = {
      "embed": {
          "title": "Sandwich Help Menu",
          "description": output,
          "footer": {
              "icon_url": bot.user.avatarURL,
              "text": "Sandwich | Discord bot made by MrSheldon#0001"
          }
      }
  };
  bot.createMessage(ctx.channel.id, data);
};

exports.help = {
  name: "help",
  category: "General"
};