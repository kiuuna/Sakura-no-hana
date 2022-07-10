const { MessageEmbed } = require("discord.js");

// db
// const mongoose = require("mongoose");
// const members = require("../database/members.js");
// const levels = require("../database/levels.js");
// const statuses = require("../database/statuses.js");
// const verifications = require("../database/verifications.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        // Get the servers general channel where it will send the welcome message
        const channel = client.channels.cache.find(channel => channel.name === "general");
        // If the general channel does not exist
        if (!channel.id) return;

        // Get the members Discord ID
        const id = member.user.id.toString();

        // /* Check if the member already exists in the db,
        // *  which means they are already verified
        // *  on another server monitored by 桜の花 */
        // const data = members.findOne({ where: { discord_id: id } }, function(error) {
        //     if (error) return handleError(error);
        // });
        // // If no error occured, the member already exists in the db
        // if (data.discord_id) return;

        // // Save the new member to the db
        // const new_member = new members({
        //     _id: new mongoose.Types.ObjectId(),
        //     discord_id: member.user.id
        // });
        // new_member.save();

        // const new_level = new levels({
        //     member: new_member._id,
        //     level: 0,
        //     experience: 0,
        //     required: 1
        // });
        // new_level.save();

        // const new_status = new statuses({
        //     member: new_member._id,
        //     afk: false,
        //     extras: ""
        // });
        // new_status.save();

        // const new_verification = new verifications({
        //     member: new_member._id,
        //     verified: true
        // });
        // new_verification.save();

        let gifs = [
            'https://c.tenor.com/JlJ5H9ItRCIAAAAC/toradora-taiga-aisaka.gif',
            'https://c.tenor.com/4gwqAPkyvrwAAAAd/white-queen-date-a-live.gif',
            'https://c.tenor.com/k8tMlA3AbeIAAAAC/akame-ga-kill.gif',
            'https://c.tenor.com/Yoitobm0iaQAAAAd/date-a-live-kurumi.gif'
        ]

        // Select random gif from the array
        let gif = gifs[Math.floor(Math.random() * gifs.length)];

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);

        // Welcome message embed
        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setTitle("kiu's anime raunji")
            .setDescription(`Hello and welcome, <@${member.user.id}> ♡`)
            .setImage(gif);

        // Send welcome message embed to the general channel
        webhook.send({
            username: member.user.username,
            avatarURL: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`,
            embeds: [embed]
        });
    }
}