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
            .setDescription("Click the button below to gain access to the rest of the server.");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("authenticate_button")
                    .setLabel("Authenticate")
                    .setStyle("PRIMARY"),
            )

        const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON" });

        collector.on("collect", i => {
            if (i.user.id === interaction.user.id) {
                i.member.roles.add(role);
                i.reply({ content: `<@${i.user.id}>, you have successfully authenticated your account.`, ephemeral: true });
            }
        });

        collector.on("end", collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });

        channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: "Successfully executed this command.", ephemeral: true });
    }
}