const { SlashCommandBuilder } = require('discord.js');
const { DateTime } = require('luxon');
const db = require('../../db/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('programar-alarma')
    .setDescription('Programa una alarma que sonará en el tiempo especificado')
    .addStringOption(option =>
      option.setName('hora')
        .setDescription('El tiempo en que se activa la alarma (HH:mm en formato 24h)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('fecha')
        .setDescription('La fecha en que sonará la alarma (yyyy-MM-dd)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('El mensaje de la alarma (máximo 60 palabras)')
        .setRequired(true)),
  async execute(interaction) {
    try {
      const userId = interaction.user.id;
      const hour = interaction.options.getString('hora');
      const date = interaction.options.getString('fecha');
      const mensaje = interaction.options.getString('mensaje');
      const dateAlarm = DateTime.fromFormat(`${date} ${hour}`, 'yyyy-MM-dd HH:mm');

      // Verificar si la fecha y hora tienen el formato correcto
      if (!dateAlarm.isValid) {
        return await interaction.reply('La **fecha** y/o la **hora** no tienen el formato correcto');
      }

      // Verificar si la fecha ingresada es a partir de la fecha actual
      if (dateAlarm < DateTime.now()) {
        await interaction.reply('La fecha ingresada es anterior a la fecha actual. **Por favor ingresa una fecha válida.**');
        return;
      }

      // Verificar si el mensaje tiene menos de 60 palabras con esta verificacion encontrada en internet
      const wordCount = mensaje.trim().split(/\s+/).length;
      if (wordCount > 60) {
        return await interaction.reply('El mensaje debe tener un máximo de **60 palabras**');
      }

      // Calcular el timestamp o sea pasar el tiempo de la fecha a miliseg
      const timestamp = dateAlarm.toMillis();

      // Insertar la alarma en la base de datos
      const statement = db.prepare(`
        INSERT INTO alarm (user_id, timestamp, mensaje)
        VALUES (?, ?, ?)
      `);
      // insertar valores en las tablas
      statement.run(userId, timestamp, mensaje);

      // Enviar mensaje de confirmación
      await interaction.reply(`**Alarma programada** para sonar el ${date} a las ${hour} con el mensaje "${mensaje}"`);

      // Configurar la función que enviará la alarma cuando sea el momento como un mensaje directo del bot y que se borre instantaneamente de la base de datos
      const sendAlarm = () => {
        interaction.user.send(`${mensaje}`);
        db.prepare('DELETE FROM alarm WHERE timestamp = ?').run(timestamp);
      };

      // Calcular el tiempo restante hasta la alarma el diffnow y el as son propiedades de luxon para calcular tiempo
      const timeLeft = dateAlarm.diffNow().as('milliseconds');

      // Configurar el timeout para enviar la alarma sin necesidad de hacer la funcion completa solo se coloca lo de la funcion de enviar la alarma y la constante de el tiempo restante
      setTimeout(sendAlarm, timeLeft);

    } catch (error) {
      console.log(error);
      await interaction.reply('Ocurrió un error al programar la alarma');
    }
  }
};
