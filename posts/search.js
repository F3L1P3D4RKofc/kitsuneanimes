module.exports = {
    run: async(req, res) => {
        if(req.body.search.toLowerCase() === 'atari') return res.redirect('/atari')
    
        
    }
}