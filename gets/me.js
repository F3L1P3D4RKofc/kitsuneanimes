const user = require('../models/user')

module.exports = {
    run: async (req, res) => {
        let cookie = req.cookies.code;
        if (!cookie) return res.redirect('/');

        let doc = await user.findOne({ token: cookie })
        res.render('me', {
            doc
        })
    }
}