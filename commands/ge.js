const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { uri } = require('./../.gitignore/config.json');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function getData(id) {
    const res = await fetch(`https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}`);
    const data = await res.json();
    return data;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ge')
        .setDescription('Prints high and low prices of the ge market')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Item name (must be exact)')
            .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('input');
        await client.connect();
        const collection = client.db('OSRS').collection('itemsTest');
        const result = await collection.find({ name: name });
        const parsed = await result.toArray();
        const data = await getData(parsed[0]['id']);
        const id = `${parsed[0]['id']}`;
        const low = data['data'][id]['low'].toLocaleString('en-US');
        const high = data['data'][id]['high'].toLocaleString('en-US');
        await interaction.reply(`The item is ${parsed[0]['name']} w/ low: ${low} and high: ${high}`);
        client.close();
    },

};