const fetch = require('node-fetch');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { uri } = require('./../.gitignore/config.json');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const url = 'https://prices.runescape.wiki/api/v1/osrs/latest?id=4151';
const fetchTest = async () => {
    fetch(url)
    .then(res => res.json())
    .then(out => {
        out.forEach(element => {
            const { name, id, highalch, lowalch } = element;
            const lowername = name.toLowerCase();


            console.log(`name: ${lowername} id: ${id} high: ${highalch} low: ${lowalch}`);
        });
    });
};

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


const refreshDatabase = async () => {
    const data = await getData();
    await client.connect();
    const collection = client.db('OSRS').collection('itemsTest');
    console.log(data.length);
    for (let i = 1; i < data.length; i++) {
        const { name, id, highalch, lowalch } = data[i];
        const lowername = name.toLowerCase();
        const doc = { name: lowername, id: id, high: highalch, low: lowalch };
        await collection.insertOne(doc);
    }
    client.close();

};

const testRead = async () => {
    await client.connect();
    const collection = client.db('OSRS').collection('itemsTest');
    const result = await collection.find({ name: '3rd age bow' });
    const parsed = await result.toArray();
    console.log(parsed[0]['id']);
    client.close();
};
const test = async () => {
    const data = await getData();
    const parsed = data['data']['4151']['high'];
    const processed = parsed.toLocaleString('en-US');
    console.log(processed);
};
test();
 // refreshDatabase()
