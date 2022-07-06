const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slap")
        .setDescription("Give someone a slap.")
        .addMentionableOption(mention => mention.setName("mention").setDescription("Mention someone").setRequired(true))
        .addStringOption(message => message.setName("message").setDescription("Send the person a special message").setRequired(false)),
    async execute(interaction, client) {
        const id = interaction.channelId;
        const channel = client.channels.cache.get(id);

        let mention = interaction.options.getMentionable("mention");
        let message = interaction.options.getString("message");

        if (!message) message = "";

        let gifs = [
            "https://i.pinimg.com/originals/46/b0/a2/46b0a213e3ea1a9c6fcc060af6843a0e.gif",
            "https://cdn.quotesgram.com/img/89/61/1219623614-slap_gif.gif",
            "https://i.pinimg.com/originals/bf/ef/b4/bfefb401ed8f1f7a3fee62d76a2856a4.gif"
        ]

        // Select random gif from the array
        let gif = gifs[Math.floor(Math.random() * gifs.length)];

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);

        if (!webhook) return console.log("No webhook was found");

        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`<@${interaction.user.id}> slaps ${mention}\n${message}`)
            .setImage(gif);

        await webhook.send({
            username: interaction.user.username,
            avatarURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            embeds: [embed]
        })

        await interaction.reply({ content: "Sent virtual slap", ephemeral: true });
    }
}