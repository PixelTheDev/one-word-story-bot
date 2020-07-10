// Import the node modules
const Discord = require('discord.js');

// Create an instance of a Discord client and sql
const client = new Discord.Client();

// create bot prefix
const prefix = ';';

// create other variables
let listening = false;
let returnStr = "";
let channel = null;
var author2;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  //client.user.setActivity("Reading beautiful words | ./start to start!"); // set game upon login
  client.user.setActivity("Reading beautiful words | ;help for help!");
  console.log('ready to hear your story!');
});

client.on("messageDelete", (message) => {
  if (listening == true && channel == message.channel) {
    return message.channel.send(`**${message.author.username}** deleted this word: **_${message}_** when wrote the story, but will be included in the story.`);
  }
});

// create an event listener for messages
client.on('message', message => {

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  if (message.content === "Im bored" || message.content === "I'm bored" && listening == false)
  {
    return message.channel.send("Write a story!");
  }

  // Otherwise ignore any message that does not start with the prefix, 
  // which is set above
  if (message.content.indexOf(prefix) !== 0)
  {
    // if listening is true, add new words to your story
    if (listening === true && channel === message.channel)
    {
      var author = message.author.id;
      var a = message.content;
      var b = a.split(" ");
      b[0], b[1]
      if (b[1] && listening == true) {
        return message.channel.send(":rage: Only one word per message! This message and the words you wrote not be included in the story. :rage:");
      } else if (author === author2) {
        return message.channel.send("You can't write 2 words in a row!");
      } else if ((message.content.indexOf(".") == 0 || message.content.indexOf(",") == 0 || message.content.indexOf("\"") == 0 || message.content.indexOf("?") == 0 || message.content.indexOf("!") == 0 || message.content.indexOf("™") == 0 || message.content.indexOf("“") == 0 || message.content.indexOf("”") == 0 || message.content.indexOf(";") == 0 || message.content.indexOf(":") == 0 || message.content.indexOf("(") == 0 || message.content.indexOf(")") == 0 || message.content.indexOf("[") == 0 || message.content.indexOf("]") == 0 || message.content.indexOf("~") == 0 || message.content.indexOf("-") == 0 || message.content.indexOf("/") == 0) && returnStr != "")
        returnStr = returnStr.slice(0, (returnStr.length - 1));

      returnStr += message.content + " ";
      author2 = author;

    }
    else return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "start")
  {
    const c = command.split(" ");
    c[0], c[1]
    if (listening === true && channel === message.channel) {
      return message.channel.send("Already reading!");
      /*else if (listening === true && channel != message.channel)
      	return message.channel.send("Already listening on another channel!");*/
    } else if (c[1]) {
      const channelarg = client.channels.get(c[1], channelName);
      listening = true;
      channel = channelarg;
      returnStr = "";
      channelarg.send(`Started in ${channelarg}! Write _;end_ for the end.`);
    }
    listening = true;
    channel = message.channel;
    returnStr = "";
    return message.channel.send("Now reading!");
  }

  if (command === "end")
  {
    /*if(channel != message.channel)
    	return message.channel.send("`./end` must be run from the same channel that `./start` was called from.");*/

    if (returnStr == "")
      return message.channel.send("You didn't write, I will be reading.");

    listening = false;
    channel = null;

    return message.channel.send("Here is your story!\n\n" + returnStr);
    //return message.channel.send(returnStr);
  }

  if (command === "see")
  {
    return message.channel.send("This is the story at the moment\n\n" + returnStr);
  }

  if (command === "help")
  {
   /*return message.channel.send("Existen estos 3 comandos:\n **;inicio** - Para empezar\n **;fin** - Para acabar\n **;ver** - Para ver como va quedando la ~~chapuza~~ historia")*/
   /* const embed = new client.MessageEmbed()
      .setTitle("Help")
      .setDescription("Commands")
      .addField("`;start` - To start")
      .addField("`;end` - To end the story")
      .addField("`;see` - To see the story without end")
      .addField("`;help` - To see this message")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
      return message.channel.send(embed)*/
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Help')
        .setDescription('The default prefix is ;')
        .addFields({ name: 'start', value: 'To start reading' }, { name: 'end', value: 'To end the story' }, { name: 'see', value: 'To see the story without end'}, { name: 'help', value: 'To see this message'}, )
        .setTimestamp()
        .setFooter(message.author.username + message.author.tag);
      
      message.channel.send(exampleEmbed);
  }
});

// log the bot in
client.login(process.env.TOKEN);