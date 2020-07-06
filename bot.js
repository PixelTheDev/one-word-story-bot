// Import the node modules
const Discord = require('discord.js');

// Create an instance of a Discord and a Twitter client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me

// create bot prefix
const prefix = './';

// create other variables
let listening = false;
let returnStr = "";
let channel = null;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    //client.user.setActivity("Reading beautiful words | ./start to start!"); // set game upon login
    client.user.setActivity("Bugs!");
    console.log('ready to hear your story!');
});

client.on("messageDelete", (message) => {
  if(listening == true && channel == message.channel){
    return message.channel.send(`**${message.author.username}** deleted this word: ${message} when writing the story`);
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
		  var a = message.content;
		  var b = a.split(" ");
		  b[0], b[1]
		  if (b[1] && listening == true) {
		    return message.channel.send("Only one word per message!");
		  }else if ((message.content.indexOf(".") == 0 || message.content.indexOf(",") ==  0 || message.content.indexOf("\"") == 0 || message.content.indexOf("?") == 0 || message.content.indexOf("!") == 0 || message.content.indexOf("™") == 0 || message.content.indexOf("“") == 0 || message.content.indexOf("”") == 0 || message.content.indexOf(";") == 0 || message.content.indexOf(":") == 0 || message.content.indexOf("(") == 0 || message.content.indexOf(")") == 0 || message.content.indexOf("[") == 0 || message.content.indexOf("]") == 0 || message.content.indexOf("~") == 0 || message.content.indexOf("-") == 0 || message.content.indexOf("/") == 0) && returnStr != "")
				returnStr = returnStr.slice(0, (returnStr.length - 1));
			
			returnStr += message.content + " ";
		}
		else return;
	}

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "start")
	{
		if(listening === true && channel === message.channel)
			return message.channel.send("Already listening on this channel! I'll make sure this word isn't logged. :wink:");
		/*else if (listening === true && channel != message.channel)
			return message.channel.send("Already listening on another channel!");*/
		
		listening = true;
		channel = message.channel;
		returnStr = "";
		return message.channel.send("Now listening! Type command `./end` to stop listening.\nRemember to end your sentences, close your quotes, write only one word at a time, and have fun!");
	}

	if (command === "end")
	{
		/*if(channel != message.channel)
			return message.channel.send("`./end` must be run from the same channel that `./start` was called from.");*/
		
		if (returnStr == "")
			return message.channel.send("You didn't write anything... But I'll keep listening!");
		
		listening = false;
		channel = null;
		
		return message.channel.send("Here is your beautiful story!")
		return message.channel.send(returnStr);
	}
});

// log the bot in
client.login(process.env.TOKEN);
