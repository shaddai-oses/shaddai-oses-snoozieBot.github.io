const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');

// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('nota-ramdom')
    .setDescription('Te muestra una nota al azar'),
  async execute(interaction) {
    try {
      const statement = db.prepare(`
           SELECT notes.content, users.first_name
           FROM notes
           JOIN users
        `);

      const notes = statement.all( );
      const randomNumber = (Math.random( ) * notes.length).toFixed( );
      const note = notes[Number(randomNumber)];
      await interaction.reply(`Nueva nota: ${note.content}. Creada por ${note.first_name}`);

    } catch (error) {
      console.log(error.message);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },

};

