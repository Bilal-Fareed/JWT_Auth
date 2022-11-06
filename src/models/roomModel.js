const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomTitle:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Room',roomSchema)