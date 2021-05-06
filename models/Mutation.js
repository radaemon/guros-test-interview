const mongoose = require('mongoose');

const Mutation = mongoose.model("Test", new mongoose.Schema({
    result: { type: Boolean }
}))

module.exports = Mutation;