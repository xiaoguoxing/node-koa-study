
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        require: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
}, { collection: 'user', versionKey: false});

export default mongoose.model('user', UserSchema);