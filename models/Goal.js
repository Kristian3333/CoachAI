const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String,
    email: String,
    first_goal: String,
    second_goal: String,
});

const Goal = mongoose.models.Post || mongoose.model('Goal', PostSchema);
module.exports = Goal;
