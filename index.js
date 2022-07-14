const express = require('express'),
    rec = require('express-recaptcha').RecaptchaV2,
    recaptcha = new rec('6LeO_0kdAAAAAD7x0SL1PAzVEuu6PxRiCwvIRdiK', '6LeO_0kdAAAAAF-kjzOqcE_ZqJpftN_CJHaA-Mdc'),
    cookieParser = require('cookie-parser'),
    { connect } = require('mongoose'),
    { ImgurClient } = require('imgur'),
    client = new ImgurClient({ clientId: '86afb01bcac3842' }),
    busboy = require('connect-busboy'),
    http = require('http'),
    app = express(); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/pages');
app.use(express.static(__dirname + '/pages/styles/'))
app.use(busboy())
app.use(cookieParser({ path: '/', maxAge: null }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

for (let x of ['gets', 'posts']) require(`./handlers/${x}`)(app, client, recaptcha);

app.get('/atari/:game', async (req, res) => {
    let bah = req.params.game

    if (bah === 'sneak') return res.render('games/sneak')
    if (bah === 'pong') return res.render('games/pong')
    if (bah === 'flappy') return res.render('games/flappy')
    if (bah === 'tetris') return res.render('games/tetris')
    if (bah === 'jumper') return res.render('games/jumper')
    if (bah === 'breakout') return res.render('games/breakout')
    if (bah === 'frogger') return res.render('games/froger')
    if (bah === 'space') return res.render('games/space')
})

app.get('/test', async(req, res) => {
    res.render('test')
})

app.get('*', (req, res) => res.render('404'))

connect('mongodb+srv://dbuser:1234@cluster0.n026m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.listen(80, function () {
    console.log('site on');
})