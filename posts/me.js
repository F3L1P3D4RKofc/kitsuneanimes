const user = require('../models/user'),
    fs = require('fs')

module.exports = {
    run: async (req, res, client) => {
        let cookie = req.cookies.code
        let doc = await user.findOne({ token: cookie })

        //avatar
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', async function (fieldname, file, filename) {
            if (filename.filename === undefined || filename.filename === null) {
                return res.render('me', {
                    doc,
                    err1: true,
                    err2: false,
                    err3: false,
                    err4: false,
                    err5: false,
                    err6: false,
                    err7: false,
                    err8: false,
                    err9: false
                })
            }
            try {
                fstream = fs.createWriteStream(filename.filename);
                file.pipe(fstream);
                fstream.on('close', async function () {
                    const a = await client.upload({
                        image: fs.createReadStream(filename.filename),
                        type: 'stream'
                    })
                    a.forEach(async (x) => {
                        if (x.success === true) {
                            fs.unlinkSync(filename.filename)
                            await user.findOneAndUpdate({ token: cookie }, { $set: { avatar: x.data.link } })
                        }
                    })
                });
            } catch(err) {
                console.log(err)
            }
        });

        //username
        if (req.body.username === '') return res.render('me', {
            doc,
            err1: false,
            err2: true,
            err3: false,
            err4: false,
            err5: false,
            err6: false,
            err7: false,
            err8: false,
            err9: false
        })

        if (req.body.username === doc.username) return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: true,
            err5: false,
            err6: false,
            err7: false,
            err8: false,
            err9: false
        })

        let bah = await user.findOne({ username: req.body.username })
        if (bah) return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: true,
            err4: false,
            err5: false,
            err6: false,
            err7: false,
            err8: false,
            err9: false
        })

        if (req.body.username) {
            await user.findOneAndUpdate({ token: cookie }, { $set: { username: req.body.username } })
            return res.redirect('/me')
        }

        //password

        if (req.body.pwd === '' || req.body.pwd && req.body.NewPwd === '') return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: true,
            err6: false,
            err7: false,
            err8: false,
            err9: false
        })

        if (req.body.NewPwd === doc.password) return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: true,
            err7: false,
            err8: false,
            err9: false
        })

        if (req.body.pwd != doc.password) return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: false,
            err7: true,
            err8: false,
            err9: false
        })

        if (req.recaptcha.error) return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: false,
            err7: false,
            err8: true,
            err9: false
        })

        if (req.body.NewPwd.length < 9 || req.body.NewPwd.length > 20) return res.render('me', {
            doc,
            err1: false,
            err2: false,
            err3: false,
            err4: false,
            err5: false,
            err6: false,
            err7: false,
            err8: false,
            err9: true
        })

        if (req.body.NewPwd) {
            await user.findOneAndUpdate({ token: cookie }, { $set: { password: req.body.NewPwd } })
            return res.redirect('/me')
        }
    }
}