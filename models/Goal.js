import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    name: String,
    email: String,
    first_goal: String,
    second_goal: String,
});

// Use existing model if it already exists or create a new one
const Goal = mongoose.models.Post || mongoose.model('Goal', PostSchema);

// Export the Goal model using ES Modules syntax
export default Goal;