
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const keyList = new Schema({
    label:String,
    value:String
})
const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    type: {
        type: String
    },
    key: {
        type: String
    },
    keyList: {
        type: [keyList]
    },
}, { collection: 'sys', versionKey: false});

export default mongoose.model('sys', UserSchema);