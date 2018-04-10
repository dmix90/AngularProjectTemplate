const puppeteer = require('puppeteer');
const express = require('express');
const { join, dirname } = require('path');
const { readFile, exists, writeFile, mkdir } = require('mz/fs')
const { uniq, difference } = require('lodash');

const port = 80;
const host = `http://localhost:${port}`;


let needToRender = ['about'];
let renderedPages = [];

async function main() {
    const app = express();
    const index = (await readFile(join(process.cwd(), 'client', 'index.html'))).toString();

    app.use(express.static('client'));
    app.get('*', (req, res) => res.send(index));

    const server = app.listen(port, () => {
        console.log(`:::Express-Temp server is listening on port: ${port}:::`)
    })

    const browser = await puppeteer.launch({
        headless: true
    });
    console.log(':::Started Headless Chrome:::')

    const newPage = await browser.newPage();

    await newPage.goto(`${host}`);
    renderedPages.push({ name: 'index', content: await newPage.evaluate(() => document.documentElement.outerHTML) });

    for (let page of needToRender) {
        await newPage.goto(`${host}/${page}`);
        const result = await newPage.evaluate(() => document.documentElement.outerHTML);
        renderedPages.push({ name: page, content: result });
    }

    for (let page of renderedPages) {
        const fileName = join(process.cwd(), 'client', page.name + '.html');
        const dir = dirname(fileName);
        await exists(dir) ? null : await mkdir(dir);
        await writeFile(fileName, page.content);
    }

    console.log(`:::Finished Rendering:::`);
    browser.close();
    server.close();
}
main()
    .then(() => console.log('Rendering pages...'))
    .catch(err => {
        console.error('Err', err);
        process.exit(1);
    });