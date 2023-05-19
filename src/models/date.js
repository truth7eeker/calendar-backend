const { ObjectId } = require('mongodb')
const { Schema, model } = require('mongoose')

const dateSchema = new Schema({
    _id: ObjectId,
    year: Number,
    month: Number,
    day: Number,
    timeSlots: [Object]
})

const date = model('date', dateSchema)

module.exports = date