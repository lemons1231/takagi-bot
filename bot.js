const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`$(f) loaded!`);
        bot.commands.set(props.help.name, props);

    });

});


bot.on("ready", async () => {
    console.log('${bot.user.username} is online!');
    
    bot.user.setActivity("Karakai Jouzu no Takagi-san", {type: "WATCHING"});

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray [0];
    let args = messageArray.slice(1);

let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);

    if(cmd === `${prefix}kick`){

        //kick cmds
    
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Oops!,You Dont have Permission S-E-N-P-A-I.");
        if(kUser.hasPermission("MANAGE_SERVER")) return message.channel.send("eehhhh!, He is a demi-god");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick Info")
        .setColor("#aaa9a9")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

     let kickChannel = message.guild.channels.find(`name`, "server-logs");
     if(!kickChannel) return message.channel.send("Can't find server-logs Channel.");
     
     message.guild.member(kUser).kick(kReason);
     kickChannel.send(kickEmbed);
     
     message.delete().catch(O_o=>{});

     return;
    }

    if(cmd === `${prefix}ban`){

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Oops!,You Dont have Permission S-E-N-P-A-I.");
        if(bUser.hasPermission("MANAGE_SERVER")) return message.channel.send("eehhhh!, Looks like his immortal.");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban Info")
        .setColor("#818080")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

     let banChannel = message.guild.channels.find(`name`, "server-logs");
     if(!banChannel) return message.channel.send("Can't find server-logs Channel.");

     message.guild.member(bUser).ban(bReason);
     banChannel.send(banEmbed);

     message.delete().catch(O_o=>{});

     return;
    }

    if(cmd === `${prefix}report`){

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Can't find user!");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Report info")
        .setColor("#818080")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);


        let reportschannel = message.guild.channels.find(`name`, "report-logs", "lounge");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    }


    if(cmd === `${prefix}botinfo`){


        let bicon = bot.user.displayAvatarURL;
        let botembed =  new Discord.RichEmbed()
        .setDescription("Takagi-san's Stats")
        .setColor("#af7cf3")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username);

        return message.channel.send(botembed);

    }
//test image
if(cmd === `${prefix}rules`){
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    message.channel.send ({files: ["./Templates/rules.png"]});

}
// rule 1
if(cmd === `${prefix}test1`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅰ** ")
    .setDescription("Be respectful, Any form of harassment, Verbal and/or Non-verbal will not be tolerated. Harassments included are, but not limited to: Racism: Posting/Sharing offensive remarks about other races. Personal Attack: Posting/Sharing derogatory remarks on someone, may it be direct or indirect.");
    
return message.channel.send(embed);
}
//rule 2
if(cmd === `${prefix}test2`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅱ** ")
    .setDescription("Do NOT SPAM in Public Channels. Spamming with multiple emojis without context is not allowed. Text Spamming: Sending multiple lines of text without context. ");
    
return message.channel.send(embed);
}
//rule 3
if(cmd === `${prefix}test3`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅲ**")
    .setDescription("No advertising, sending server invite links, or any links in inappropriate channels. Kindly message any admin for server invite. For external links.");
    
return message.channel.send(embed);
}

//rule 4
if(cmd === `${prefix}test4`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅳ**")
    .setDescription("Tagging a person without a valid reason is not allowed. Please use this function in moderation. ");
    
return message.channel.send(embed);
}

//rule 5
if(cmd === `${prefix}test5`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅴ**")
    .setDescription("Members should post in the designated channel. ");
    
return message.channel.send(embed);
}

//rule 6
if(cmd === `${prefix}test6`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅵ**")
    .setDescription("No Doxxing. Don't post someone's personal information without their permission. Doxxing includes: Name, Age, Photo, Address, Current Location, Any information about their immediate family members. ");
    
return message.channel.send(embed);
}

//rule 7
if(cmd === `${prefix}test7`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅶ**")
    .setDescription("Explicit topics/NSFW, NSFW content are not allowed at any Text-channels at any time, Except for NSFW channels. ");
    
return message.channel.send(embed);
}

//rule 8
if(cmd === `${prefix}test8`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅷ**")
    .setDescription("Moderators & Admins should only be pinged only if it is urgent, If you want to be dragged in a room, thats not urgent. If some bots arent working, thats when you can ping us. Urgent topics include: Being harrassed, Potential Trolling ");
    
return message.channel.send(embed);
}

//rule 9
if(cmd === `${prefix}test9`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅸ**")
    .setDescription("Have some CAPSLOCK ETIQUETTE, Please refrain from posting in all caps. If Mee6 does not detect your post, any admin has the power to issue a warning.");
    
return message.channel.send(embed);
}

//rule 10
if(cmd === `${prefix}test10`){

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry this command is only for my master!");
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Rule Ⅹ**")
    .setDescription("Respect the Moderators/Administrators/Owner at all times, They are really working hard to make this server a better place for you.");
    
return message.channel.send(embed);
}

//tease hahaha
if(cmd === `${prefix}loves?`){

    
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Secret Information** ")
    .setDescription("Do .nishikata, for deeper information. ");
    
return message.channel.send(embed);
}

//tease hahaha 2
if(cmd === `${prefix}nishikata`){

    
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Secret Information** ")
    .setDescription("Do .lemon, for more deeper information. ");
    
return message.channel.send(embed);
}

//tease hahaha 3
if(cmd === `${prefix}lemon`){

    
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Secret Information** ")
    .setDescription("Do .takagi, You'r almost there! ");
    
return message.channel.send(embed);
}

//tease hahaha 4
if(cmd === `${prefix}takagi`){

    
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Hehehehehe..** ")
    .setDescription("Just Kidding! ");
    
return message.channel.send(embed);
}

//help handler
if(cmd === `${prefix}help`){

    
    let embed = new Discord.RichEmbed()
    .setColor("#af7cf3")
    .setTitle("**Fun Commands** ")
    .setDescription("loves?")
    .setTitle("**Basic Commands** ")
    .setDescription("help")
    .setDescription("serverinfo")
    .setDescription("botinfo");
    
return message.channel.send(embed);
}

if(cmd === `${prefix}serverinfo`){


    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#af7cf3")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Total Members", message.member.membercount);

    return message.channel.send(serverembed);
}

});

bot.login(botconfig.token);
