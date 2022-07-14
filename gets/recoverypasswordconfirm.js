const user = require('../models/user')

module.exports.run = async(req, res) => {
    let cookie = req.cookies.recover
    if(!cookie) return res.redirect('/login')

    let doc = await user.findOne({ token : cookie})

    res.render('pwd2', {
        doc,
        err4: false,
        err3: false,
        err5: false
    })
}