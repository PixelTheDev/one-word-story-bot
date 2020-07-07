// Import the node modules
const Discord = require('discord.js');

// Create an instance of a Discord client and sql
const client = new Discord.Client();
const sql = require('sqlite');
sql.open("./db.sqlite");



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
    client.user.setActivity("Test DB");
    console.log('ready to hear your story!');
});

client.on("messageDelete", (message) => {
  if(listening == true && channel == message.channel){
    return message.channel.send(`**${message.author.username}** deleted this word: __${message}__ when writing the story`);
  }
});

// create an event listener for messages
client.on('message', message => {
  
    sql.run("CREATE TABLE IF NOT EXISTS userData (userId TEXT, money INTEGER)").then(() => {
      sql.run("INSERT INTO userData (userId, money) VALUES (?, ?)", [message.author, 0]);
    });
    
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
		  var author = message.author;
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
			sql.get(`SELECT * FROM userData WHERE userId = ${messages.author.id}`).then(row => { //the row is the user"s data
			      if (!row) { //if the user is not in the database
			        sql.run("INSERT INTO userData (userId, money) VALUES (?, ?)", [`${guildId}`, message.author.id, 0]); //let"s just insert them
			message.channel.send("Registered.")
			} else { //if the user is in the database
			sql.run(`UPDATE userData SET money = ${row.money + 100} WHERE guild = ${msg.guild.id}`)
			}
			});
		}
		else return;
		  author2 = message.author;
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
		return message.channel.send("Now listening! Type command `;end` to stop listening.\nRemember to end your sentences, close your quotes, write only one word at a time, and have fun!");
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
});

// log the bot in
client.login(process.env.TOKEN);
