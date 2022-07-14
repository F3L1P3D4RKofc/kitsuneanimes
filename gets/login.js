const user = require('../models/user')

module.exports = {
    run: async(req, res) => {
        let cookie = req.cookies.code;
        if(cookie) return res.redirect('/')
        
        res.render('login', {
            err1: false,
            err2: false,
            err3: false,
            err4: false
        })
    }
}