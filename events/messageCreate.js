const prefix = "s!";
module.exports = (bot, ctx) => {
    if (ctx.author.bot) return;
    if (ctx.content.indexOf(prefix) !== 0) return;
    const args = ctx.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    const cmd = bot.commands.get(command);
    if (!cmd) return;
    cmd.run(bot, ctx, args);
}
