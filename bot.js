// Import the node modules
const Discord = require('discord.js');

// Create an instance of a Discord client and sql
const client = new Discord.Client();

// create bot prefix
const prefix = ';';
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// create other variables
let listening = false;
let returnStr = "";
let channel = null;
var author2;

// Initialize the server configurations
const Enmap = require('enmap');

// I attach settings to client to allow for modular bot setups
// In this example we'll leverage fetchAll:false and autoFetch:true for
// best efficiency in memory usage. We also have to use cloneLevel:'deep'
// to avoid our values to be "reference" to the default settings.
// The explanation for why is complex - just go with it.
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
// Just setting up a default configuration object here, to have somethign to insert.
const defaultSettings = {
  prefix: ";"
}

const story = {
  text: ""
}

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
  
  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
  
  const savedStory = client.settings.ensure(message.guild.id, story);
  
  // Now we can use the values! 
  // We stop processing if the message does not start with our prefix for this guild.

  // Otherwise ignore any message that does not start with the prefix, 
  // which is set above
  if (message.content.indexOf(guildConf.prefix) !== 0)
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
      } else if (author === author2 && listening === true) {
        return message.channel.send("You can't write 2 words in a row! The last word won't be included in the story");
      } else if ((message.content.indexOf(".") == 0 || message.content.indexOf(",") == 0 || message.content.indexOf("\"") == 0 || message.content.indexOf("?") == 0 || message.content.indexOf("!") == 0 || message.content.indexOf("™") == 0 || message.content.indexOf("“") == 0 || message.content.indexOf("”") == 0 || message.content.indexOf(";") == 0 || message.content.indexOf(":") == 0 || message.content.indexOf("(") == 0 || message.content.indexOf(")") == 0 || message.content.indexOf("[") == 0 || message.content.indexOf("]") == 0 || message.content.indexOf("~") == 0 || message.content.indexOf("-") == 0 || message.content.indexOf("/") == 0) && returnStr != "")
        returnStr = returnStr.slice(0, (returnStr.length - 1));

      returnStr += message.content + " ";
      author2 = author;

    }
    else return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
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
      /*const channelarg = client.channels.get(c[1], channelName);*/
      const channelarg = client.channels.cache.get(c[1]);
      channel.send("Started");
      listening = true;
      channel = channelarg;
      returnStr = "";
      return message.channelarg.send(`Started in ${channelarg}! Write _;end_ for the end.`);
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

    if (returnStr == "" && listening == true){
      return message.channel.send("You didn't write, I will be reading.");
    }
    if (listening == false){
      return message.channel.send("Start it first!")
    }

    listening = false;
    channel = null;
    author = "";
    author2 = "";

    return message.channel.send('Here is your story!\n\n' + returnStr);
    
    returnStr = "";
    //return message.channel.send(returnStr);
  }

  if (command === "see")
  {
    if (returnStr === ""){
      return message.channel.send("You didn't write anything!")
    }
    return message.channel.send("This is the story at the moment\n\n" + returnStr)
  }
  
  if (command === "stats") {
    let mcount = client.users.cache.size;
    let scount = client.guilds.cache.size;
    let tcount = client.channels.cache.size;
      const embed = new Discord.MessageEmbed()
        .setColor('#33EAA3')
        .setAuthor('Stats')
        .addField('**Users:**', `${mcount}`)
        .addField('**Servers:**', `${scount}`)
        .addField('**Text channels:**', `${tcount}`)
        .setTimestamp()
        .setFooter(message.author.tag);
    message.channel.send(embed)
  }
  
  if (command === "server"){
    return message.channel.send("Here you are!\nhttps://discord.gg/n6DX5Vd")
  }
  
  if (command === "invite"){
    return message.channel.send("Of course!\nhttps://discord.com/oauth2/authorize?client_id=728709263962275840&scope=bot&permissions=68608")
  }

  if (command === "help")
  {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#33EAA3')
        .setAuthor('Help')
        .setDescription('The default prefix is ;')
        .addFields({ name: 'start', value: 'To start reading' }, { name: 'end', value: 'To end the story' }, { name: 'see', value: 'To see the story without end'}, { name: 'help', value: 'To see this message'}, { name: 'server', value: "To get the link to the bot's server" }, { name: 'invite', value: 'To invite me ;)'}, { name: 'stats', value: 'To see the stats'}, { name: 'setconf prefix <prefix>', value: 'To set a custom prefix'}, { name:'showconf', value: 'To see the prefix'})
        .setTimestamp()
        .setFooter(message.author.tag);
      
      message.channel.send(exampleEmbed);
  }
    // Alright. Let's make a command! This one changes the value of any key
    // in the configuration.
    if (command === "setconf") {
      // Command is admi
  
      // Then we'll exit if the user is not
      // Let's get our key and value from the arguments. 
      // This is array destructuring, by the way. 
      const [prop, ...value] = args;
      // Example: 
      // prop: "prefix"
      // value: ["+"]
      // (yes it's an array, we join it further down!)
  
      // We can check that the key exists to avoid having multiple useless, 
      // unused keys in the config:
      if (!client.settings.has(message.guild.id, prop)) {
        return message.reply("This key is not in the configuration.");
      }
  
      // Now we can finally change the value. Here we only have strings for values 
      // so we won't bother trying to make sure it's the right type and such. 
      client.settings.set(message.guild.id, value.join(" "), prop);
  
      // We can confirm everything's done to the client.
      message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
    }
      if (command === "showconf") {
        let configProps = Object.keys(guildConf).map(prop => {
          return `${prop}  :  ${guildConf[prop]}\n`;
        });
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configProps}\`\`\``);
      }
});

// log the bot in
client.login(process.env.TOKEN);