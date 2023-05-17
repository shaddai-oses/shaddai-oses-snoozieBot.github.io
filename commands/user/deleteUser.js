const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');
const { stripIndent } = require('common-tags');

// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('eliminar')
    .setDescription('Elimina tu usuario'),
  async execute(interaction) {
    try {
      const id = interaction.user.id;

      const statement = db.prepare(`
        DELETE FROM users 
        WHERE user_id =?
      `);

      statement.run(id);

      await interaction.reply(stripIndent`
        <@${id}>
        Tu usuario ha sido eliminado
      `);

    } catch (error) {
      console.log(error);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },
};