const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const  {  read, intToRGBA } = require ('jimp');

const getCountry = async (countryName) => {
  const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
  return data;
};

const getWeather = async (lat, lon) => {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=272998403e432de46bc8a6334ee88c42`);
  return data;
};

const createEmbed = async (country, weather) => {
  const image = await read(country.flags.png);
  const { r, g, b } = intToRGBA(image.getPixelColor(0, 0));

  const exampleEmbed = new EmbedBuilder()
    .setColor([ r, g, b ])
    .setTitle(country.translations.spa.common)
    .setURL(`https://es.wikipedia.org/wiki/${country.translations.spa.common}`)
    .setThumbnail(country.flags.png)
    .addFields(
      { name: 'Poblacion', value: String(country.population), inline :true },
      { name: 'Capital', value: country.capital[0], inline :true  },
      { name: 'Region', value: country.region, inline :true  },
      { name: 'Temperatura', value: String(weather.main.temp), inline :true  },
    );

  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-pais')
    .setDescription('Busca un pais en especifico')
    .addStringOption(Option =>
      Option
        .setName('pais')
        .setDescription('Nombre del pais')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply( );
      const country = interaction.options.getString('pais');
      const countryData = await getCountry(country);
      const lat = countryData[0].latlng[0];
      const lon = countryData[0].latlng[1];
      const weather = await getWeather(lat, lon);
      const embed = await createEmbed(countryData[0], weather);
      await interaction.editReply({ embeds : [embed] });
    } catch (error) {
      console.log(error);
      await interaction.editReply(`<@${interaction.user.id}> has colocado un pais erroneo! Intenta de nuevo`);
    } }
};