const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pat")
        .setDescription("Give someone a pat.")
        .addMentionableOption(mention => mention.setName("mention").setDescription("Mention someone").setRequired(true))
        .addStringOption(message => message.setName("message").setDescription("Send the person a special message").setRequired(false)),
    async execute(interaction, client) {
        const id = interaction.channelId;
        const channel = client.channels.cache.get(id);

        let mention = interaction.options.getMentionable("mention");
        let message = interaction.options.getString("message");

        if (!message) message = "";

        let gifs = [
            "https://c.tenor.com/edHuxNBD6IMAAAAC/anime-head-pat.gif",
            "https://78.media.tumblr.com/7c5b99badfbb6bc5f0fbe354d1fa2657/tumblr_oyi4das9oq1ql0375o1_1280.gif",
            "https://c.tenor.com/RXUee0zOhC8AAAAC/kawai-anime.gif",
            "https://i.pinimg.com/originals/a0/6d/65/a06d65ad49f019aaae3f30fb872df619.gif",
            "https://giffiles.alphacoders.com/184/184069.gif",
            "https://i.redd.it/clhwgy5ekhb21.gif"
        ]

        // Select random gif from the array
        let gif = gifs[Math.floor(Math.random() * gifs.length)];

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);

        if (!webhook) return console.log("No webhook was found");

        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`<@${interaction.user.id}> pats ${mention}\n${message}`)
            .setImage(gif);

        await webhook.send({
            username: interaction.user.username,
            avatarURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            embeds: [embed]
        })

        await interaction.reply({ content: "Sent virtual pat", ephemeral: true });
    }
}