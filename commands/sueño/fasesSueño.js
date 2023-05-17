const { SlashCommandBuilder } = require('discord.js');
const { stripIndent } = require('common-tags');
// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ciclos-de-sueño')
    .setDescription('informacion de los ciclos de sueño')
    .addSubcommand(subcommand =>
      subcommand
        .setName('info')
        .setDescription('Informacion de los ciclos de sueño'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('edad')
        .setDescription('tu edad')
        .addStringOption(option =>
          option.setName('edad')
            .setDescription('tu edad')
            .setRequired(true))),
  async execute(interaction) {
    try {
      if (interaction.options.getSubcommand( ) === 'info') {
        await interaction.reply({ content: stripIndent`Existen cinco fases principales del sueño que se alternan en ciclos a lo largo de la noche. Estas fases son: 
        **-Fase 1:** 
        es la fase del sueño ligero, donde la persona se está quedando dormida y aún puede ser fácilmente despertada. Durante esta fase, la actividad cerebral disminuye y la respiración se vuelve más lenta y regular. 
        **-Fase 2:**
        es la fase del sueño intermedio, en la que la actividad cerebral disminuye aún más y el cuerpo se relaja aún más. Durante esta fase, se producen las ondas del sueño lento y los movimientos oculares se detienen.
        **-Fase 3:** 
        es la fase del sueño profundo, también conocida como sueño de ondas lentas. Durante esta fase, la actividad cerebral es muy lenta y el cuerpo se encuentra en un estado de relajación total. En esta fase, es más difícil despertar a la persona. 
        **-Fase 4:**
        es una fase muy similar a la fase 3, en la que el cuerpo está en un estado de relajación total y la actividad cerebral es muy lenta. A menudo, se agrupa con la fase 3 y se denomina sueño de ondas lentas. 
        **-Fase REM:**
        es la fase del sueño en la que ocurre el sueño paradójico o movimiento rápido de los ojos (REM, por sus siglas en inglés). Durante esta fase, la actividad cerebral aumenta y los ojos se mueven rápidamente de lado a lado. También se produce una mayor actividad del corazón y de la respiración, y los sueños son más frecuentes e intensos.` });

      } else if (interaction.options.getSubcommand( ) === 'edad') {
        const edad = parseInt(interaction.options.getString('edad'));
        let mensaje = '';
        if ( edad >= 1 && edad <= 12 ) {
          mensaje= ' **Los niños de 1 a 12 años:** **-Fase 1:** de 5 a 15 minutos **-Fase 2:** de 45 a 55 minutos **-Fase 3 y 4:** de 20 a 30 minutos **-Fase REM:** de 45 a 60 minutos.';
          await interaction.reply(`${mensaje}`);
        }
        if ( edad >= 13 && edad <= 21) {
          mensaje = ' **Los Adolescentes de 13 a 21 años:** **-Fase 1:** de 10 a 20 minutos **-Fase 2:** de 50 a 60 minutos **-Fase 3 y 4:** de 30 a 45 minutos **-Fase REM:** de 90 a 120 minutos.';
          await interaction.reply(`${mensaje}`);
        }
        if ( edad >= 22 && edad <= 35) {
          mensaje = ' **Los Adultos jóvenes de 22 a 35 años:** **-Fase 1:** de 5 a 10 minutos **-Fase 2:** de 10 a 25 minutos **-Fase 3 y 4:** de 10 a 20 minutos **-Fase REM:** de 90 a 120 minutos.';
          await interaction.reply(`${mensaje}`);
        }
        if ( edad >= 36 && edad <= 59 ) {
          mensaje = '** Los Adultos de 36 a 59 años:** **-Fase 1:** de 5 a 10 minutos **-Fase 2:** de 15 a 25 minutos **-Fase 3 y 4:** de 5 a 15 minutos **-Fase REM:** de 90 a 120 minutos.';
          await interaction.reply(`${mensaje}`);
        }
        if ( edad >= 60 && edad <= 90) {
          mensaje = ' **Las Personas mayores de 60 a 90 años:** **-Fase 1:** de 5 a 10 minutos **-Fase 2:** de 15 a 25 minutos **-Fase 3 y 4:** de 5 a 10 minutos **-Fase REM:** de 90 a 120 minutos.';
          await interaction.reply(`${mensaje}`);
        }
        if (edad === 0 || edad > 90) {
          await interaction.reply('debe de ingresar una edad entre **1** año de edad y **90** años de edad');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },
};
