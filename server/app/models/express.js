
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const expressSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    expressId: {
        type: String
    },
    issueAddress: {
        type: String
    },
    issueName: {
        type: String
    },
    issuePhone: {
        type: String
    },
    collectAddress: {
        type: String
    },
    collectName: {
        type: String
    },
    collectPhone: {
        type: String
    },
    expressSituation: {
        type: String
    },
    expressType: {
        type: String
    },
    expressState: {
        type: String
    },
    addTime: {
        type: Date
    },
    addUserId: {
        type: String
    },
}, { collection: 'express', versionKey: false});

export default mongoose.model('express', expressSchema);