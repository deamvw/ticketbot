const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "."; //prefix
var token = "NTMzMzA1MzIwNzg1NzA3MDIw.XW_y9Q.6j6fn9x7LPichDJYnS-bZTIFtsA"; //token

client.on("ready", () => {
console.log(`Ticket Started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("guildCreate", (guild) => {
client.user.setActivity(`help / new | ${client.guilds.size} servers`);
    guild.owner.user.send(`Hi there, i'm Fox, i'm a ticket bot, for everyone!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:fox: Fox Help`)
    .setColor(0xCF40FA)
    .setDescription(`Hi i'm Fox,  your personal help, on this chat platform.`)
    .addField(`Tickets`, `[${prefix}new]() > This will be open a ticket!\n[${prefix}close]() >This close a ticket`)
    .addField(`Other`, `[${prefix}help]() > Show this menu\n[${prefix}ping]() > Ping the server \n[${prefix}about]() > About me.`)
    message.channel.send({ embed: embed });
  }
  
  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`Hoold on!`).then(m => {
    m.edit(`:ping_pong: Wew, we made it ~waves~ ! **Pong!**\n Message edit time ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API 💓beat is ` + Math.round(client.ping) + `ms.`);
    });
}


  client.on('guildMemberAdd', member => {
  client.message.send(
    `Welcome to the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
})
  
   if (message.content === `${prefix}user-info`) {
	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	    console.log(`New user have use the command user-info: username: ${message.author.username} And ID: ${message.author.id}`);
}
   
   if (message.content === `${prefix}server`) {
	message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
}

if (message.content === `${prefix}avatar`) {
	message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);

}



client.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.find(channel => channel.name === "reports");
    // A real basic message with the information we need. 
    logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
	    });
if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`:fox: You can't open more tickets!`);
    let guild = message.guild;
    const Category = client.channels.get('597017934769946645');
	message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`🦊Your ticket, has opened for you!, #${message.author.username}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `🦊 Tell the problem as clearly as possible. \nMake sure you have a screenshot / video where you can see who / what happened.!`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`🦊 Wow, you can't close this funny channel!`);
   
    message.channel.send(`🦊 Are you sure, i can't re- open your ticket channel.. \nType \`sure\`. I give you 10 seconds..`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'sure', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('🦊 Oh My Gash, there is a problem, should we try it again?').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

exports.run = (client, message, args) =>{
    const setStatus = message.content.split(' ');

    if(setStatus[1] === 'afk'){
        client.user.setAFK(true);
        message.channel.send("Your status has been set to afk!");
    }

    else if(setStatus[1] === 'notafk'){
        client.user.setAFK(false);
        message.channel.send(`Welcome back ${message.author}`);
    }

    else if(!setStatus[1] || setStatus[1] === undefined){
        message.channel.send("You did not choose afk or notafk as current status!");
    }

    else{
        message.channel.send("You did not choose afk or notafk as current status!");
    }

}


});

client.login(token);


