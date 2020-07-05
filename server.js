/*const express = require('express');
const keepalive = require('express-glitch-keepalive');

const app = express();

app.use(keepalive);

app.get('/', (req, res) => {
res.json('This bot should be online! Uptimerobot will keep it alive');
});
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);
/*//*ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE
*/
/*/*/ /*const express = require('express');
const keepalive = require('express-glitch-keepalive');

const app = express();

app.use(keepalive);

app.get('/', (req, res) => {
res.json('This bot should be online! Uptimerobot will keep it alive');
});
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);*/
const http = require('http'); //*/ /*/ */
/* */const express = require('express');
const app = express();

//
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000); /* .*/


/*setInterval('ping()',280000);

function ping(){
   var pingserver = new Image();
   pingserver.src = "httpsa://one-word-story.glitch.me";

   if (pingserver.height<0) {
     console.log('Sistema reactivado');
   } 
}*/

//setInterval('ping()',280000);

/*function ping(){
   var pingserver = new Image();
   pingserver.src = "https://one-word-story.glitch.me";

   if (pingserver.height<0) {
     console.log('Sistema reactivado');
   } 
}

setInterval('ping()',280000);/*/

/*function ping(){
   var pingserver = new Image();
   pingserver.src = "https://one-word-story.glitch.me";

   if (pingserver.height<0) {
     console.log('Sistema reactivado');
   } 
}
/*

//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT

/*const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('estoy listo!'); 
  client.user.setActivity(`prueba helpLooking for words :)`);
});

client.on('message', message => {
  if (message.content.startsWith("ping")) {
   let ping = Math.floor(message.client.ping);
   message.channel.send(':ping_pong: `'+ping+' ms.`'); 
  }
  
});

client.login(process.en*/

/*const Discord = require('discord.js');
const client = new Discord.Client();

const STORYCH = '#one-word-channel'; //ID of the one word story channel
const TOP = ''; //ID of first word

const ILLEGAL = []; //array of banned words

client.once('ready', () => {
    console.log('Ready!');
});

//client.login(proccess.env.TOKEN); //insert your key between quotes
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);  //log message just to verify that Discord isn't down
    client.user.setActivity('giving headpats', { type: 'PLAYING' });  //headpats cuz why not uwu
  });

function cont(container, outlcl) { //container collects the words, outlcl is the msg sent to use to find target channel/guild
    if (container[0][0] == TOP)  //check if there's more words
    {//if not
        var comp = "";
        for (let i = 0; i < container.length; i++) {
            if (comp.length + container[i][1].content.length >= 2000)  //split messages because 2000 character limit
            {
                outlcl.channel.send(comp);
                comp = '';
            }
            if (!container[i][1].author.bot) //don't include bot level ups
            {
                comp = comp + container[i][1].content + " "; //space
            }
            if (i == container.length-1)
            {
                outlcl.channel.send(comp); //finish
            }
        }
    }
    else
    {//if so
        outlcl.guild.channels.cache.get(STORYCH).messages.fetch( { before: container[0][0], limit: 100 }).then(words => { //grab the next 100 messages
            for (var e of words)
            {
                var m = e[1].content.toLowerCase().trim();
                if (ILLEGAL.indexOf(m) == -1 && ILLEGAL.indexOf(m.substring(0, m.length-1)) == -1 && ILLEGAL.indexOf(m.substring(1, m.length) == -1)) {
                    container.unshift(e); //plop into the array
                }
            }
            cont(container, outlcl); //keep going
        });
    }
}
client.on('message', msg => {
    if (msg.toString() == "!compile" && msg.channel.id == '') //compiles first 100 messages.  Put bot commands channel id between quotes to restrict bot to the channel
    {
        msg.channel.send("working...");
        out = []; //holds words
        msg.guild.channels.cache.get(STORYCH).messages.fetch( { limit: 100 }).then(words => { //grab 100 messages at a time
            for (var e of words)
            {
                var m = e[1].content.toLowerCase().trim();
                if (ILLEGAL.indexOf(m) == -1 && ILLEGAL.indexOf(m.substring(0, m.length-1)) == -1 && ILLEGAL.indexOf(m.substring(1, m.length) == -1)) {
                    out.unshift(e); //plop into the array
                }
            }
            cont(out, msg); //next batch
        });
    }
});*/

// Import the node modules
const Discord = require('discord.js');

// Create an instance of a Discord and a Twitter client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = '';

// create bot prefix
const prefix = './';

// create other variables
let listening = false;
let returnStr = "";
let channel = null;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    client.user.setActivity("Type `./start` to start!"); // set game upon login
    console.log('ready to hear your story!');
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
			if ((message.content.indexOf(".") == 0 || message.content.indexOf(",") ==  0 || message.content.indexOf("\"") == 0 || message.content.indexOf("?") == 0 || message.content.indexOf("!") == 0 || message.content.indexOf("™") == 0 || message.content.indexOf("“") == 0 || message.content.indexOf("”") == 0 || message.content.indexOf(";") == 0 || message.content.indexOf(":") == 0 || message.content.indexOf("(") == 0 || message.content.indexOf(")") == 0 || message.content.indexOf("[") == 0 || message.content.indexOf("]") == 0 || message.content.indexOf("~") == 0 || message.content.indexOf("-") == 0 || message.content.indexOf("/") == 0) && returnStr != "")
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
	/*	else if (listening === true && channel != message.channel)
			return message.channel.send("Already listening on another channel!");*/
		
		listening = true;
		channel = message.channel;
		returnStr = "";
		return message.channel.send("Now listening! Type command `./end` to stop listening.\nRemember to end your sentences, close your quotes, write only one word at a time, and have fun!");
	}

	if (command === "end")
	{
		if(channel != message.channel)
			return message.channel.send("`./end` must be run from the same channel that `./start` was called from.");
		
		if (returnStr == "")
			return message.channel.send("You didn't write anything... But I'll keep listening!");
		
		listening = false;
		channel = null;
		
		
		return message.channel.send(returnStr);
	}
});

// log the bot in
client.login(process.env.TOKEN);

//client.user.setActivity('Reading a book', {type: 'PLAYING'});
//km
/*const express = require('express');
const keepalive = require('express-glitch-keepalive');

const app = express();

app.use(keepalive);

app.get('/', (req, res) => {
res.json('This bot should be online! Uptimerobot will keep it alive');
});
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);*/