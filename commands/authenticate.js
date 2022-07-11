const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("authenticate")
        .setDescription("Creates an authentification field.")
        .setDMPermission(false),
    async execute(interaction) {
        const channel = interaction.member.guild.channels.cache.find(c => c.name === "rules");
        const role = interaction.member.guild.roles.cache.find(r => r.name === "Member");

        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setTitle("Authenticate your account")
            .setDescription("By clicking the authenticate button, you agree to our server rules.");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("authenticate_button")
                    .setLabel("Authenticate")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setURL("https://github.com/kiuuna/Sakura-no-hana#data-management")
                    .setLabel("Learn More")
                    .setStyle("LINK"),
            )

        const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON" });

        collector.on("collect", i => {
                i.member.roles.add(role);
                i.reply({ content: `<@${i.user.id}>, you have successfully authenticated your account.`, ephemeral: true });
        });

        channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: "Successfully executed this command.", ephemeral: true });
    }
}