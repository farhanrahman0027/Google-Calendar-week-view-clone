const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startdate || !endDate) {
            return res.status(400).json({
                succes: false,
                message: 'start date and end date are required'
            });
        }
        const events = await Event.find({
            startTime: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ startTime: 1 });

        res.json({
            sucess: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.log('Eroor fetchng events:', error);
        res.status(500).json
            ({
                sucess: false,
                message: 'Server error while fetching events',
                errror: error.message
            });
    }
});