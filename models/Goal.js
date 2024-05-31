import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
    name: String,
    email: String,
    first_goal: String,
    second_goal: String,
});

// Use existing model if it already exists or create a new one
const Goal = mongoose.models.Goal || mongoose.model('Goal', GoalSchema);

// Export the Goal model using ES Modules syntax
export default Goal;