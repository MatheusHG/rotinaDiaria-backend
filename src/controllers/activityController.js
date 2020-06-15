const express = require('express')
const authMiddleware = require('../middlewares/auth') 

const Activity = require('../models/activity')

const router = express.Router()

router.use(authMiddleware) 

router.get('/', async (req, res) => {
    try {
        const activitys = await Activity.find({user: req.userId}) 
       
        return res.send({ activitys })

    } catch (err) {
        return res.status(400).send({ error: 'Error loading projects' })
    }
})

router.get('/search', async (req, res) => {
    const { title } = req.query
    
    const activityResponse = await Activity.find({ title })
    
    if(activityResponse){
        
        return res.json( activityResponse )
    }
    return res.status(400).json({error: 'Activity not found'})
})

router.post('/', async (req, res) => {
    try{
        const activity = await Activity.create({ ...req.body, user: req.userId })

        return res.send({ activity })

    } catch(err) {
        return res.status(400).send({ error: 'Error creating new Activity' })
    }
})

router.put('/:activityId', async (req, res) => {
    try {
        const { title, date, time, description, priority } = req.body

        const activity = await Activity.findByIdAndUpdate(req.params.activityId, {
            title,
            date,
            time,
            description,
            priority
        }, { new: true })

        await activity.save()

        return res.send({ activity })
    } catch (err) {
        return res.status(400).send({ error: 'Error updating new activity' })
    }
})

router.delete('/:activityId', async (req, res) => {
    try {
        await Activity.findByIdAndRemove(req.params.activityId)

        return res.send()
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting activity' })
    }
})

module.exports = app => app.use('/activity', router)
