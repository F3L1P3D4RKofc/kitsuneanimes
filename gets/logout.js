module.exports = {
    run: async(req, res) => {
        res.clearCookie('code')
        res.redirect('/')
    }
} 