const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kiss")
        .setDescription("Give someone a kiss.")
        .addMentionableOption(mention => mention.setName("mention").setDescription("Mention someone").setRequired(true))
        .addStringOption(message => message.setName("message").setDescription("Send the person a special message").setRequired(false)),
    async execute(interaction, client) {
        const id = interaction.channelId;
        const channel = client.channels.cache.get(id);

        let mention = interaction.options.getMentionable("mention");
        let message = interaction.options.getString("message");

        if (!message) message = "";

        let gifs = [
            "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-34.gif",
            "https://pa1.narvii.com/6248/cae38662b21747d6247776d35b8d2db50944ef08_hq.gif",
            "https://thumbs.gfycat.com/ScaryOfficialChickadee-size_restricted.gif",
            "https://i.pinimg.com/originals/42/31/52/42315262acfc5ef62dcd18bd900747ef.gif"
        ]

        // Select random gif from the array
        let gif = gifs[Math.floor(Math.random() * gifs.length)];

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);

        if (!webhook) return console.log("No webhook was found");

        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`<@${interaction.user.id}> kisses ${mention}\n${message}`)
            .setImage(gif);

        await webhook.send({
            username: interaction.user.username,
            avatarURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            embeds: [embed]
        })

        await interaction.reply({ content: "Sent virtual kiss", ephemeral: true });
    }
}