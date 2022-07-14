let user = require('../models/user')

module.exports.run = async(req, res) => {
    let cookie = req.cookies.recover
    if(!cookie) return res.redirect('/login')

    let doc = await user.findOne({ token : cookie })

    res.render('pwd3', {
        doc,
        err1: false,
        err2: false,
        err3: false,
        err4: false
    })
} 