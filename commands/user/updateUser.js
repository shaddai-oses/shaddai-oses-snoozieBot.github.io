const { SlashCommandBuilder, bold } = require('discord.js');
const db = require('../../db/db');
const { stripIndent } = require('common-tags');

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('actualizar-usuario')
    .setDescription('Actualiza tu usuario!')
    .addStringOption(option =>
      option
        .setName('email')
        .setDescription('Tu email')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const email = interaction.options.getString('email');
      const id = interaction.user.id;

      if (!EMAIL_REGEX.test(email)) {
        return await interaction.reply('El email ingresado no es válido. Por favor, ingresa un email válido.');
      }

      const userOld = db.prepare(`
        SELECT email FROM users
        WHERE user_id = ? 
      `).get(id);

      if (!userOld) {
        return await interaction.reply('Ups! Tu usuario no se encuentra registrado');
      }

      const statement = db.prepare(`
        UPDATE users 
        SET email = ?
        WHERE user_id = ?
      `);

      statement.run(email, id);
      await interaction.reply(stripIndent`
        <@${id}>
        Se actualizó tu correo de ${bold(userOld.email)} a ${bold(email)}
      `);
    } catch (error) {
      console.log(error.message);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya está registrado`);
      }
    }
  },
};
