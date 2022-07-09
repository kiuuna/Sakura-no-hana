const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("webhook")
        .setDescription("Creates a webhook of your message.")
        .setDMPermission(false)
        .addStringOption(message => message.setName("message").setDescription("The message you want to embed.").setRequired(true)),
    async execute(interaction, client) {
        const id = interaction.channelId;
        const channel = client.channels.cache.get(id);

        const message = interaction.options.getString("message");

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);

        if (!webhook) return console.log("No webhook was found");

        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`${message}`);

        await webhook.send({
            username: interaction.user.username,
            avatarURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            embeds: [embed]
        })

        await interaction.reply({ content: "Sent webhook message", ephemeral: true })
    }
}