const { SlashCommandBuilder } = require('discord.js');

// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('hola')
    .setDescription('Responde con un chao!'),
  async execute(interaction) {
    await interaction.reply('chao!');
  },
};
