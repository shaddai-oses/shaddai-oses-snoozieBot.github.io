const { SlashCommandBuilder } = require('discord.js');

// archivos en algun lado que puedes usar alli
module.exports = {
  data: new SlashCommandBuilder()
    .setName('duracion-de-sueño')
    .setDescription('Cuanto tiempo deberias dormir segun tu edad')
    .addStringOption(Option =>
      Option
        .setName('edad')
        .setDescription('Tu edad')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {
      const edad = interaction.options.getString('edad');
      let mensaje = '';
      if ( edad >= 1 && edad <= 12 ) {
        mensaje= '**Niños de 1 a 12 años:** se recomienda que los niños en este rango de edad duerman de 10 a 12 horas al día. El sueño es esencial para el desarrollo físico y cognitivo de los niños, y una cantidad adecuada de sueño les ayuda a mantener su capacidad de atención, memoria, y aprendizaje. La falta de sueño en los niños puede provocar una disminución de su capacidad cognitiva, dificultades de comportamiento, irritabilidad y problemas de crecimiento.';
        await interaction.reply(`${mensaje}`);
      }
      if ( edad >= 13 && edad <= 21) {
        mensaje = '**Adolescentes de 13 a 21 años:** se recomienda que los adolescentes duerman de 8 a 10 horas al día. Los adolescentes necesitan una cantidad adecuada de sueño para mantener una buena salud física y mental. La falta de sueño en los adolescentes puede causar problemas de concentración, disminución de la capacidad de aprendizaje, trastornos del estado de ánimo y aumento del riesgo de accidentes automovilísticos.';
        await interaction.reply(`${mensaje}`);
      }
      if ( edad >= 22 && edad <= 35) {
        mensaje = ' **Adulto joven de 22 a 35 años:** se recomienda que los adultos jóvenes duerman de 7 a 9 horas al día. La cantidad adecuada de sueño ayuda a mantener la salud física y mental, a reducir el riesgo de enfermedades crónicas y a mejorar la capacidad cognitiva. La falta de sueño en los adultos jóvenes puede provocar problemas de memoria, dificultades para concentrarse, aumento del estrés y un mayor riesgo de enfermedades cardiovasculares.';
        await interaction.reply(`${mensaje}`);
      }
      if ( edad >= 36 && edad <= 59 ) {
        mensaje = '**Adulto promedio de 36 a 59 años:** se recomienda que los adultos duerman de 7 a 9 horas al día. La cantidad adecuada de sueño ayuda a mantener una buena salud física y mental, a reducir el riesgo de enfermedades crónicas y a mejorar la capacidad cognitiva. La falta de sueño en los adultos puede provocar problemas de memoria, dificultades para concentrarse, aumento del estrés y un mayor riesgo de enfermedades cardiovasculares.';
        await interaction.reply(`${mensaje}}`);
      }
      if ( edad >= 60 && edad <= 90) {
        mensaje = '**Personas mayores de 60 a 90 años:** se recomienda que las personas mayores duerman de 7 a 8 horas al día. Una cantidad adecuada de sueño ayuda a mejorar la calidad de vida, a reducir el riesgo de enfermedades crónicas y a mejorar la capacidad cognitiva. La falta de sueño en las personas mayores puede provocar problemas de memoria, dificultades para concentrarse, disminución de la capacidad para realizar actividades diarias y un mayor riesgo de caídas.';
        await interaction.reply(`${mensaje}`);
      }
      if (edad === 0 || edad > 90) {
        await interaction.reply('debe de ingresar una edad entre **1** año de edad y **90** años de edad');
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> tu usuario ya esta registrado`);
      }
    }
  },
};