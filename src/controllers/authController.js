const express = require('express') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

const User = require('../models/user') 

const router = express.Router() 


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: 86400, 
        
    })
}

router.post('/register', async (req, res) => {
    const { email, user } = req.body;
   
    try { 
        if (await User.findOne({ user })) {
            return res.status(400).send({ error: 'User already exists' });
        } 
        else if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        const userConst = await User.create(req.body); 
        userConst.password = undefined 

        return res.send({ 
            userConst,
            token: generateToken({ id: userConst.id }), 
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration error, user or email already exists' })
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, user, password } = req.body; 

    const userConst = await User.findOne({ email }).select('+password') || await User.findOne({ user }).select('+password')

    if(!userConst){
        return res.status(400).send({ error:'User not found' }) 
    }

    if (!await bcrypt.compare(password, userConst.password)){
        return res.status(400).send({ error:'Invalid password' }) 
    }

    userConst.password = undefined 

    res.send({ 
        userConst, 
        token: generateToken({ id: userConst.id })
    });
})


module.exports = app => app.use(router) 
