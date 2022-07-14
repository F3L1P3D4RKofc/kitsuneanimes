const user = require('../models/user');

module.exports = {
    run: async (req, res) => {
        let cookie = req.cookies.code
        if (!cookie) {
            return res.render('index', {
                user: null
            })
        }

        let doc = await user.findOne({ token: cookie })
        if(doc.verification.verify === false) return res.redirect('/verification')
        res.render('index', {
            user: doc
        })
    }
}