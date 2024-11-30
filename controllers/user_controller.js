const accountM = require('../models/account_models');
const sha256 = require('js-sha256')

module.exports = {
    getAll: async (req, res, next) => {
        try{
            const users = await accountM.all();
            res.render('user', {
                pcss: () => 'css/bs',
                users: users
            })
        }
        catch (err){
            console.log("hehe")
        }
    },
    getOne: async (req, res, next) => {
        try{
            const un = req.params.id;
            const user = await accountM.one(un);
            res.render('userDetails', {
                pcss: () => 'css/bs',
                user: user
            })
        }
        catch (err){
            console.log("hehe")
        }
    },
    postAdd: async (req, res, next) => {
        try{
            let user = {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Permission: parseInt(req.body.Permission),
                Name: req.body.Name,
                DOB: req.body.DOB,
            };

            const salt = new Date().getTime().toString();
            const pwSalt = `${user.Password}${salt}`
            const pwHased = sha256(pwSalt);
            user.Password = pwHased + salt;
            user = await accountM.add(user);
            res.json(user);
        }
        catch (err){
            console.log("hehe")
        }
    },
    isAutenticated: async (req, res, next) => {
        if (!req.session.user){
            return res.redirect('/user/login');
        }
        next();
    },
    getLogin: async (req, res, next) => {
        res.render('login', {
            pcss: () => 'css/bs'
        });
    },
    postAuth: async (req, res, next) => {
        try{
            const user = await accountM.one(req.body.Username);
            if (!user){
                return res.redirect('/user/login');
            }
            const salt = user.Password.slice(-13);
            console.log('salt', salt);
            const pwSalt = `${req.body.Password}${salt}`;
            const pwHassed = sha256(pwSalt);
            if (pwHassed !== user.Password.slice(0, -13)){
                return res.redirect('user/login');
            }
            req.session.user = user;
            res.redirect('/user');
        }
        catch (err){
            console.log("hehe")
        }
    }
}