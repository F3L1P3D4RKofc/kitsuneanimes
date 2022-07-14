const user = require('../models/user'),
    email = require('nodemailer');

module.exports.run = async (req, res) => {
    let doc = await user.findOne({ email: req.body.email })

    if (req.body.email === '') {
        return res.render('pwd', {
            err1: true,
            err2: false,
            err3: false,
            err4: false,
            err5: false
        })
    }
    if (!doc) {
        return res.render('pwd', {
            doc,
            err1: false,
            err2: true,
            err3: false,
            err4: false,
            err5: false
        })
    }
    if (req.recaptcha.error) {
        return res.render('pwd', {
            doc,
            err1: false,
            err2: false,
            err3: true,
            err4: false,
            err5: false
        })
    }

    var transporter = email.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3'
        },
        port: '587',
        auth: {
            user: 'kitsuneanimes.tk@outlook.com',
            pass: 'kitsuneanimes1'
        }
    });

    let code = Math.floor(Math.random() * 999999)

    var mailOptions = {
        from: 'kitsuneanimes.tk@outlook.com',
        to: req.body.email, 
        subject: 'Alterando a senha',
        text: `Olá ${doc.username}, aqui está seu código para recuperar a senha da sua conta *${code}* \ncaso não tenha sido você que pediu para trocar a senha ignore esse email!`
    };


    transporter.sendMail(mailOptions);
    await user.findOneAndUpdate({ email: req.body.email }, { $set: { recover: code } })

    res.cookie('recover', doc.token)
    res.redirect('/recoverypasswordconfirm')
}