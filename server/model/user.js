import mongoose from 'mongoose';


// how our document look like
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});


// we need to turn it into a model
const postUser = mongoose.model('user', userSchema);

export default postUser;