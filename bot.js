// Import the node modules
const Discord = require('discord.js');

// Create an instance of a Discord client and sql
const client = new Discord.Client();
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

const defaultSettings = {
  prefix: ";",
  modLogChannel: "mod-log",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeChannel: "welcome",
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"
}

client.on("guildDelete", guild => {
  // Removing an element uses `delete(key)`
  client.settings.delete(guild.id);
});

client.on("guildMemberAdd", member => {
  // This executes when a member joins, so let's welcome them!

  // First, ensure the settings exist
  client.settings.ensure(member.guild.id, defaultSettings);

  // First, get the welcome message using get: 
  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

  // Our welcome message has a bit of a placeholder, let's fix that:
  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

  // we'll send to the welcome channel.
  member.guild.channels
    .find("name", client.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
});

// Nowe let's get to the commands!
// This runs on every message we'll use it to demonstrate loading and changing values
client.on("message", async (message) => {
  // This stops if it's not a guild (obviously), and we ignore all bots.
  if (!message.guild || message.author.bot) return;

  // We can use ensure() to actually grab the default value for settings,
  // if the key doesn't already exist. 
  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

  // We also stop processing if the message does not start with our prefix.
  if (message.content.indexOf(guildConf.prefix) !== 0) return;

  //Then we use the config prefix to get our arguments and command:
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(guildConf.prefix.length).toLowerCase();

  // Alright. Let's make a command! This one changes the value of any key
  // in the configuration.
});

// create bot prefix
const prefix = ';';

// create other variables
let listening = false;
let returnStr = "";
let channel = null;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    //client.user.setActivity("Reading beautiful words | ./start to start!"); // set game upon login
    client.user.setActivity("🌀");
    console.log('ready to hear your story!');
});

client.on("messageDelete", (message) => {
  if(listening == true && channel == message.channel){
    return message.channel.send(`**${message.author.username}** deleted this word: __${message}__ when writing the story, but it be included in the story if is not a bot command`);
  }
});

// create an event listener for messages
client.on('message', message => {
    
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if(message.author.bot) return;

    // Otherwise ignore any message that does not start with the prefix, 
    // which is set above
    if(message.content.indexOf(prefix) !== 0)
	{
		// if listening is true, add new words to your story
		if(listening === true && channel === message.channel)
		{
		  var author = message.author.id;
		  var author2;
		  var a = message.content;
		  var b = a.split(" ");
		  b[0], b[1]
		  if (b[1] && listening == true) {
		    return message.channel.send("Only one word per message! These word won't be included in the story.");
		  }else if(author === author2){
		    return message.channel.send("You can't write 2 words in a row!");
		    author2 = "" ;
		  }else if ((message.content.indexOf(".") == 0 || message.content.indexOf(",") ==  0 || message.content.indexOf("\"") == 0 || message.content.indexOf("?") == 0 || message.content.indexOf("!") == 0 || message.content.indexOf("™") == 0 || message.content.indexOf("“") == 0 || message.content.indexOf("”") == 0 || message.content.indexOf(";") == 0 || message.content.indexOf(":") == 0 || message.content.indexOf("(") == 0 || message.content.indexOf(")") == 0 || message.content.indexOf("[") == 0 || message.content.indexOf("]") == 0 || message.content.indexOf("~") == 0 || message.content.indexOf("-") == 0 || message.content.indexOf("/") == 0) && returnStr != "")
				returnStr = returnStr.slice(0, (returnStr.length - 1));
			
			returnStr += message.content + " ";
			author2 = author;
		}
		else return;
	}

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "start")
	{
	  const c = command.split(" ");
	  c[0], c[1]
		if(listening === true && channel === message.channel){
			return message.channel.send("Already listening on this channel! I'll make sure this word isn't logged. :wink:");
		/*else if (listening === true && channel != message.channel)
			return message.channel.send("Already listening on another channel!");*/
			}else if(c[1]){
			  const channelarg = client.channels.get(c[1], channelName);
			  listening = true;
			  channel = channelarg;
			  returnStr = "";
			  channelarg.send(`Now listening on ${channelarg}! Type command _;end_ to stop listening.\nRemember to end your sentences, close your quotes, write only one word at a time, and have fun!`);
			}
		listening = true;
		channel = message.channel;
		returnStr = "";
		return message.channel.send("Now listening on this channel! Type command `;end` to stop listening.\nRemember to end your sentences, close your quotes, write only one word at a time, and have fun!");
	}

	if (command === "end")
	{
		/*if(channel != message.channel)
			return message.channel.send("`./end` must be run from the same channel that `./start` was called from.");*/
		
		if (returnStr == "")
			return message.channel.send("You didn't write anything... But I'll keep listening!");
		
		listening = false;
		channel = null;
		
		return message.channel.send("Here is your beautiful story!\n\n" + returnStr);
		//return message.channel.send(returnStr);
	}
	if (command === "setconf") {
	  // Command is admin only, let's grab the admin value: 
	  const adminRole = message.guild.roles.find("name", guildConf.adminRole);
	  if (!adminRole) return message.reply("Administrator Role Not Found");
	
	  // Then we'll exit if the user is not admin
	  if (!message.member.roles.has(adminRole.id)) {
	    return message.reply("You're not an admin, sorry!");
	  }
	
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
	
	// Now let's make another command that shows the configuration items.
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
