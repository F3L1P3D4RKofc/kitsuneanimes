const user = require('../models/user')

module.exports.run = async(req, res) => {

    res.render('pwd',{
        err1: false,
        err2: false,
        err3: false,
        err4: false,
        err5: false
    })
}