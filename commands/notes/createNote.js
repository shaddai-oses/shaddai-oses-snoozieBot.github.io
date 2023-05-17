const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');

// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-nota')
    .setDescription('Crear una nueva nota')
    .addStringOption(Option =>
      Option
        .setName('contenido')
        .setDescription('El contenido de la nota')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const content = interaction.options.getString('contenido');

      // para la fecha y hora en metodo iso y luego a string
      const created = new Date( ).toISOString( );

      const statement = db.prepare(`
            INSERT INTO notes (content, user_id, created_at)
            VALUES (?, ?, ?)
        `);

      statement.run( content, interaction.user.id, created);
      await interaction.reply(`Nueva nota: ${content}. Creada!`);

    } catch (error) {
      console.log(error.message);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },

};

