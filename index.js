const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser');
const db = require('./models')

db.Book.sync()

const app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static('public'))

router(app)

app.listen(3000, () => console.log('Example app listening on port 3000!'))