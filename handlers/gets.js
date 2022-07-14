const { readdirSync } = require('fs'),
user = require('../models/user');

module.exports = (app, client, recaptcha) => {
    let paste = readdirSync('./gets/').filter(x => x.endsWith('.js'))

    for(let file of paste) {
        let pull = require(`../gets/${file}`)

        pull.page = pull.page || file.replace('.js', '')

        app.get('/', (req, res) => res.redirect('/home'))
        app.get(`/${pull.page}`, recaptcha.middleware.render ,async(req, res) => pull.run(req, res, client))
        app.get('/me/config', async(req, res) => {
            let cookie = req.cookies.code;
            if (!cookie) return res.redirect('/');
    
            let doc = await user.findOne({ token: cookie })
            res.render('config', {
                doc,
                err1: false,
                err2: false,
                err3: false,
                err4: false,
                err5: false, 
                err6: false,
                err7: false,
                err8: false,
                err9: false
            })
        })
    };
}
