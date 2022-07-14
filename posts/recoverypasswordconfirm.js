const user = require('../models/user'),
    email = require('nodemailer');

module.exports.run = async (req, res) => {
    let cookie = req.cookies.recover
    if(!cookie) return res.redirect('/recoverypassword')

    let doc = await user.findOne({ token : cookie})

        if (req.body.code == '') return res.render('pwd2', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: true,
            err5: false
        })
    
        if (req.body.code !== doc.recover) return res.render('pwd2', {
            doc,
            err1: false,
            err2: false,
            err3: false, 
            err4: false,
            err5: true
        })
    
        if (req.recaptcha.error) {
            return res.render('pwd2', {
                doc,
                err1: false,
                err2: false,
                err3: true,
                err4: false,
                err5: false 
            })
    
        }
    
        res.redirect('/newpwd')

}