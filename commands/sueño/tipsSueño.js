const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');
const { stripIndent } = require('common-tags');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tips')
    .setDescription('Qué puedes mejorar a la hora de dormir'),
  async execute(interaction) {
    try {
      const statement = db.prepare(`
        SELECT tips.tip1, tips.tip2, tips.tip3
        FROM tips
      `);
      const userId = interaction.user.id;
      const tips = statement.all();
      const randomNumber = Math.floor(Math.random() * tips.length);
      const randomtip = tips[randomNumber];
      await interaction.reply({
        content: stripIndent`
          Hey <@${userId}>. ¡Espero que te sean útiles estos tips!
          **Aquí tienes algunos tips para dormir mejor**: 
          ${randomtip.tip1}. 
          **También puedes probar hacer algunas cosas antes de dormir para descansar mejor**:
           ${randomtip.tip2}.
          **Y si te interesa mejorar tu alimentación para dormir mejor, prueba consumir alimentos como**: 
          ${randomtip.tip3}.
        `,
      });

    } catch (error) {
      console.log(error);
      await interaction.reply('Vuelve a intentarlo');
    }
  },
};


