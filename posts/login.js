const user = require('../models/user')

module.exports = {
    run: async(req, res) => {
        if(req.body.email === '' || req.body.password === '')return res.render('login', {
            err1: true,
            err2: false,
            err3: false,
            err4: false
        })

        let doc = await user.findOne({email: req.body.email})
        if(!doc) return res.render('login', {
            err1: false,
            err2: true,
            err3: false,
            err4: false
        })

        if(req.body.password !== doc.password) return res.render('login', {
            err1: false,
            err2: false,
            err3: true,
            err4: false
        })

        if(req.recaptcha.error) return res.render('login', {
            err1: false,
            err2: false,
            err3: false,
            err4: true
        })



        res.cookie('code', doc.token)
        if(doc.verification.verify === false) return res.redirect('/verification')
        res.redirect('/')
    }
}
