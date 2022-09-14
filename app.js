const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');
const port = 3000;
const articles = [];


app.get('/', (req, res) => {

    axios.get('https://www.theguardian.com/international')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("queen")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => {
            console.log(err)
        })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
