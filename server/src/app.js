let express = require('express');
let bodyParser = require('body-parser');

const { sequelize } = require('./models');
const config = require('./config/config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app)

app.get('/status', function (req, res) {
    console.log('------------------------------');
    console.log(req);
    console.log('------------------------------');
    res.send('Hello nodejs server');
})

app.get('/hello/:person', function (req, res) {
    console.log('hello - ' + req.params.person)
    res.send('sey hello with ' + req.params.person)
})

app.get('/user/:userId', function (req, res) {
    res.send('ดูข้อมูลผู้ใช้งาน' + req.params.userId)
})

app.get('/user', function (req, res) {
    res.send('เรียกข้อมูลผู้ใช้งาน ' + req.params.userId)
})

app.post('/user', function (req, res) {
    res.send('ทำการสร้างผู้ใช้งาน ' + JSON.stringify(req.body)
    )
})

app.put('/user/:userId', function (req, res) {
    res.send('ทำการแก้ไขผู้ใช้งาน' + req.params.userId + ' : ' +
        JSON.stringify(req.body))
})

app.delete('/user/:userId', function (req, res) {
    res.send('ทำการลบผู้ใช้งาน' + req.params.userId + ' : ' +
        JSON.stringify(req.body))
})

app.post('/hello', function (req, res) {
    res.send('OK you post - ' + req.body.name)
})

let port = process.env.PORT || config.port

sequelize.sync({ force: true }).then(() => {
    app.listen(port, function () {
        console.log('Server running on ' + port)
    })
})