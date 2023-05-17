const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');

const NAME_REGEX = /^[A-Za-z ]+$/;
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('agregar-usuario')
    .setDescription('Agregar usuario a nuestro bot!')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Tu nombre')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('apellido')
        .setDescription('Tu apellido')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('email')
        .setDescription('Tu email')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const name = interaction.options.getString('nombre');
      const lastName = interaction.options.getString('apellido');
      const email = interaction.options.getString('email');
      const id = interaction.user.id;

      // la propiedad match es para saber si coinciden
      if (!name.match(NAME_REGEX)) {
        await interaction.reply('El nombre solo puede contener letras y espacios en blanco.');
        return;
      }

      if (!lastName.match(NAME_REGEX)) {
        await interaction.reply('El apellido solo puede contener letras y espacios en blanco.');
        return;
      }

      if (!email.match(EMAIL_REGEX)) {
        await interaction.reply('Por favor ingrese un email válido.');
        return;
      }

      const created = new Date().toISOString();

      const statement = db.prepare(`
        INSERT INTO users (user_id, first_name, last_name, email, created_at)
        VALUES (?, ?, ?, ?, ?)
      `);

      statement.run(id, name, lastName, email, created);
      await interaction.reply(`Bienvenido <@${id}> al servidor!`);
    } catch (error) {
      console.log(error.message);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },
};
