const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');

const app = express()

const dataFile = 'database/data.txt'
const port = 80

//app.set('view engine', 'ejs');
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
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

/*app.get('/', (req, res) =>
{
    console.log(`${getIP(req)} just accessed /`)
    fs.readFile(dataFile, (err, data) =>
    {
        res.render('index', { data: parseData(data) })
    })
})*/

app.post('/add', (req, res) =>
{
    var newText = req.body.text

    if (newText.length == 0)
        return
    
    console.log(`${getIP(req)} sent this url: ${newText}`)

    var generated = randomString(5)

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