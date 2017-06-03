const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');

const app = express()

const dataFile = 'database/data.txt'
const genLength = 5
const port = 80

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

function getIP(req)
{
    return req.ip.split(':').pop()
}

function isURL(str)
{
    return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(str)
}

function randomString(length)
{
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

app.get(new RegExp(`\\w{${genLength}}`), (req, res) =>
{
    url = req.url.substr(1)
    fs.readFile(dataFile, (err, data) =>
    {
        data = data.toString().split('\n')
        for (var i = 0; i < data.length; ++i)
        {
            var index = data[i].indexOf(':')
            var a = data[i].substr(0, index)
            var b = data[i].substr(index + 1)
            if (a === url)
            {
                res.redirect(b)
                return
            }
        }

        res.status(404).send('Not found')
    })
})

app.post('/add', (req, res) =>
{
    var inputUrl = req.body.inputUrl.trim()

    if (inputUrl.length == 0 || !isURL(inputUrl))
    {
        res.send('url not valid')
        return
    }

    var generated = randomString(genLength)
    fs.appendFile(dataFile, `${generated}:${inputUrl}\n`, (err) => { if (err) throw err })
    res.send(generated)
})

app.listen(port, () =>
{
    console.log(`Server running at http://localhost:${port}/`)
})