const mongoose = require("mongoose")
const Schema = mongoose.Schema

const foodSchema = new Schema({
    title: String,
    type: String,
    description: String,
    image: String
})

const Food = mongoose.model("Food", foodSchema)

module.exports= Food;