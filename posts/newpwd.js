const user = require('../models/user'),
    email = require('nodemailer');

module.exports.run = async (req, res) => {
    let cookie = req.cookies.recover
    if(!cookie) return res.redirect('/recoverypassword')

    let doc = await user.findOne({ token : cookie})

    if(req.body.pwd === '' || req.body.pwd2 === '') {
        return res.render('pwd3', {
            doc,
            err1: true,
            err2: false,
            err3: false,
            err4: false
        })
    }

    if(req.body.pwd !== req.body.pwd2) return res.render('pwd3', {
        doc,
        err1: false,
        err2: true,
        err3: false,
        err4: false
    })

    if(req.body.pwd.length < 9 || req.body.pwd.length > 20) return res.render('pwd3', {
        doc,    
        err1: false,
            err2: false, 
            err3: true,
            err4: false
        })

    if(req.recaptcha.error) return res.render('pwd3', {
        doc,
        err1: false,
        err2: false, 
        err3: false, 
        err4: true
    })

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


    var mailOptions = {
        from: 'kitsuneanimes.tk@outlook.com',
        to: doc.email,
        subject: 'Senha Alterada',
        text: `Olá ${doc.username}, sua senha foi alterada com sucesso!`
    };


    transporter.sendMail(mailOptions);
    res.clearCookie('recover')
    res.redirect('/login')
} 