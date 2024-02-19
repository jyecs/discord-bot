const { SlashCommandBuilder } = require('discord.js');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const getRawData = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
    .then((data) => {
    return data;
    });
};

// Currently, this does not work and I'm not entirely sure why.
// It seems that the HTML data is not being completely gatherd.

const getData = async (args) => {
    const URL = `https://u.gg/lol/champions/${args}/build`;
    const rawData = await getRawData(URL);
    const parsedData = cheerio.load(rawData);
    if (typeof parsedData('.additional-stats-container')[0] !== 'undefined') {
        const stats = parsedData('.additional-stats-container')[0].children[0];
        const winrate = stats.children[1].children[0].children[0]['data'];
        return `${args} has a ${winrate} winrate`;
    }
    else {
        return 'This champion does not exist or there is no such data.';
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wr')
        .setDescription('Prints winrate of given champion. (Currently does not work)')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Champion Name')
            .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('input');
        const winrate = await getData(name);
        await interaction.reply(winrate);
    },

};