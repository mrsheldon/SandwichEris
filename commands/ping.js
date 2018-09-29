exports.run = async (bot, ctx, args) => {
    bot.createMessage(ctx.channel.id, "Pong!");
};
  
  exports.help = {
    name: "ping",
    category: "General"
  };