const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hug")
        .setDescription("Give someone a hug.")
        .addMentionableOption(mention => mention.setName("mention").setDescription("Mention someone").setRequired(true))
        .addStringOption(message => message.setName("message").setDescription("Send the person a special message").setRequired(false)),
    async execute(interaction, client) {
        const id = interaction.channelId;
        const channel = client.channels.cache.get(id);

        let mention = interaction.options.getMentionable("mention");
        let message = interaction.options.getString("message");

        if (!message) message = "";

        let gifs = [
            "https://c.tenor.com/1T1B8HcWalQAAAAC/anime-hug.gif",
            "https://data.whicdn.com/images/149387905/original.gif",
            "https://c.tenor.com/TsNPGmW4w8sAAAAC/sao-kirito.gif"
        ]

        // Select random gif from the array
        let gif = gifs[Math.floor(Math.random() * gifs.length)];

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);

        if (!webhook) return console.log("No webhook was found");

        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`<@${interaction.user.id}> hugs ${mention}\n${message}`)
            .setImage(gif);

        await webhook.send({
            username: interaction.user.username,
            avatarURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            embeds: [embed]
        })

        await interaction.reply({ content: "Sent virtual hug", ephemeral: true });
    }
}