module.exports = {
    run: async(req, res) => {
        let cookie = req.cookies.code
        if(cookie) return res.redirect('/')

        res.render('register',{
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: false
        })
    }
}