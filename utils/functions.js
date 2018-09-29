module.exports = (bot) => {
    bot.loadCommand = (commandName) => {
        try {
          const props = require(`../commands/${commandName}`);
          console.log(`Loading Command: ${props.help.name}`);
          if (props.init) {
            props.init(bot);
          }
          bot.commands.set(props.help.name, props);
          return false;
        } catch (e) {
          return `Unable to load command ${commandName}: ${e}`;
        }
      };
}