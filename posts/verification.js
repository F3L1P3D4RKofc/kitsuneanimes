const user = require('../models/user')

module.exports = {
    run: async (req, res) => {
        let cookie = req.cookies.code
        let doc = await user.findOne({ token: cookie })

        if (req.body.code === '') return res.render('verify', {
            err1: true,
            err2: false,
            doc
        })

        if (doc.verification.code != req.body.code) return res.render('verify', {
            err1: false,
            err2: true,
            doc
        })
    else
        await user.findOneAndUpdate({ token: cookie }, { $set: { verification: { verify: true } } })
        res.redirect('/')
    }
}