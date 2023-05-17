const { SlashCommandBuilder, bold } = require('discord.js');
const db = require('../../db/db');
const { stripIndent } = require('common-tags');

// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('perfil')
    .setDescription('Muestra tu perfil!'),
  async execute(interaction) {
    try {
      const id = interaction.user.id;
      // console.log(name, lastName, email, id);

      const statement = db.prepare(`
        SELECT * FROM users
        JOIN notes
        ON users.user_id = notes.user_id
        WHERE users.user_id = ?
        `);

      const user = statement.all(id);
      console.log('prueba');
      const usersito = user.reduce((acc, next) => {
        if(!acc.notes) {
          acc.notes = [ ];
        }
        const note = { id: next.note_id, content: next.content };
        acc.notes = [...acc.notes, note];
        acc.name = `${next.first_name} ${next.last_name}`;
        acc.email = next.email;
        acc.created = next.created_at;
        return acc;
      }, { } );


      if (!user) return await interaction.reply('Ups! tu usuario  o se encuentra registrado');

      await interaction.reply({ content: stripIndent`
      ${bold('Usuario:')}<@${id}>
        ${bold('Nombre:')} ${usersito.name}
        ${bold('Email:')} ${usersito.email}
        ${bold('Notas creadas:')} ${usersito.notes.length}
        ${bold('Ultima nota creada:')} ${usersito.notes[usersito.notes.length -1].content}
        ${bold('Fecha de creacion:')} ${new Date(usersito.created).toLocaleString( ).split(',')[0] }
      `, ephemeral: true });

      await interaction.reply(`Bienvenido <@${id}> al servidor!`);

    } catch (error) {
      console.log(error);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },
};