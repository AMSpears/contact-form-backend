const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')

const router = require('./router.js');

// set up of routes
const cors = require('cors')
const app = express()
app.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
// view engine set up
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// body-parser middlewear
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Static Public
app.use('./public', express.static(path.join(__dirname, 'public')))

app.use('/', router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

module.exports = app