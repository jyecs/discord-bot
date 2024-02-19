const cheerio = require("cheerio");
const fetch = require("node-fetch");

const getRawData = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
    .then((data) => {
    return data;
    });
};

const getData = async (args) => {
    const URL = `https://www.op.gg/champions/nasus/top/build?region=global&tier=platinum_plus`;
    const rawData = await getRawData(URL);
    const $ = cheerio.load(rawData)
    const test = $(".css-oxevym ew1oorz4")
    console.log(test);

};

const testRun = async (args) => {
    let tokens = args.split(" ")
    let text = await getData(tokens[0])
}


const cheerioTest = () => {
    const $ = cheerio.load(`<ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
  </ul>`)
  console.log($('.apple').text())

}


// cheerioTest()
testRun("gnar")