const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userFoodSchema = new Schema({
  title: String,
  type: String,
  description: String,
  image: String
})

const userFood = mongoose.model("userFood", userFoodSchema)

module.exports = userFood;