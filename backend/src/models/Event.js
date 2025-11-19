const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    srartTime: {
        type: Date,
        required: [true, 'Start time is required']
    },
    endTime: {
        type: Date,
        required: [true, 'End time is required'],
        validate: {
            validator: function (value) {
                return value > this.startTime;
            },
            message: 'End time must be after start time'
        }
    },
    color: {
        type: String,
        default: '#3b82f6',
        match: [/^#([A-Fa-f0-9]{6})$/, 'Invalid color format']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps: true
    
});

eventSchema.index({startTime:1,endTime:1});

module.exports=mongoose.model('Event',eventSchema);