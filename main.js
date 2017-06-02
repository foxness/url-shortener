const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express()

const dataFile = 'database/data.txt'
const port = 80

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

function getIP(req)
{
    return req.ip.split(':').pop()
}

function parseData(data)
{
    return data.toString().split('\n').filter(a => a.length > 0)
}

function randomString(length)
{
    return crypto.randomBytes(length).toString('hex')
}

app.get('/', (req, res) =>
{
    console.log(`${getIP(req)} just accessed /`)
    fs.readFile(dataFile, (err, data) =>
    {
        res.render('index', { data: parseData(data) })
    })
})

app.post('/add', (req, res) =>
{
    console.log(`${getIP(req)} just accessed /add`)
    var newText = req.body.text

    if (newText.length == 0)
        return
    
    console.log(`Got new text: ${newText}`)

    var generated = randomString(3)

    fs.appendFile(dataFile, `${generated}:${newText}\n`, (err) =>
    {
        if (err) throw err
    })

    res.send(generated)
})

app.listen(port, () =>
{
    console.log(`Server running at http://localhost:${port}/`)
})