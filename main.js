const fs = require("fs")
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const dataFile = "database/data.txt"

const port = 80

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

function getIP(req)
{
    return req.ip.split(':').pop()
}

app.get('/', (req, res) =>
{
    console.log(`${getIP(req)} just accessed /`)
    fs.readFile(dataFile, (err, data) =>
    {
        res.render('index', {data: data.toString().split('\n').filter(a => a.length > 0)})
    })
})

app.post('/add', (req, res) =>
{
    console.log(`${getIP(req)} just accessed /add`)
    var newText = req.body.text

    if (newText.length == 0)
        return
    
    console.log(`Got new text: ${newText}`)
    fs.appendFile(dataFile, newText + "\n", (err) =>
    {
        if (err)
            throw err
    })
})

app.listen(port, () =>
{
    console.log('Server running at http://localhost:' + port + '/')
})