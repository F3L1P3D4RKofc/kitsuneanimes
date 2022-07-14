const user = require('../models/user'),
email = require('nodemailer')

module.exports = {
    run: async (req, res) => {
        if (req.body.email === '' || req.body.password === '' || req.body.password2 === '' || req.body.username === '') return res.render('register', {
            err1: true,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: false
        })

        let doc = await user.findOne({ email : req.body.email }),
        doc2 = await user.findOne({ username : req.body.username })

        if(doc) return res.render('register', {
            err1: false,
            err2: true,
            err3: false,
            err4: false,
            err5: false,
            err6: false
        })

        if(doc2) return res.render('register', {
            err1: false,
            err2: false, 
            err3: true,
            err4: false,
            err5: false,
            err6: false
        })

        if(req.body.password.length < 9 || req.body.password.length > 20) return res.render('register', {
            err1: false,
            err2: false, 
            err3: false,
            err4: true,
            err5: false,
            err6: false
        })

        if(req.body.password !== req.body.password2) return res.render('register', {
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: true,
            err6: false
        })

        if(req.recaptcha.error) return res.render('register', {
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: true
        })
        var remetente = email.createTransport({
            host: 'smtp-mail.outlook.com',
            secureConnection: false,
            tls: {
                ciphers:'SSLv3'
                },
            port: '587',
            auth: {
                user: 'kitsuneanimes.tk@outlook.com',
                pass: 'kitsuneanimes1'
            }
        });
            let code = Math.floor(Math.random() * 999999)

            remetente.sendMail({
                from: 'kitsuneanimes.tk@outlook.com',
                to: req.body.email ,
                subject: 'Código de verificação',
                text: `Esse aqui é seu código de verificação ${code}`
            })

            let token = Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 20);

            let docu = new user({
                email: req.body.email,
                username: req.body.username,
                avatar: 'https://media.discordapp.net/attachments/915734811375710238/985305930314960907/unknown.png',
                password: req.body.password,
                token: token,
                recover: 'null',
                verification: {
                    code: code,
                    verify: false
                }
            })

            docu.save();
            res.redirect('/login');
    }
}