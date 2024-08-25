import { time } from 'console';
import {Schema, model, models} from 'mongoose';

const appointSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    name: {
        type: String,
        required: true,
    },
    lastname:{
        type:String,
        required:  true,   
    },
    email: {
        type: String,
        required: true,
    },
     petname: {
         type: String,
         required: true,
     },
     pettype: {
         type: String,
         required:true,
     },
     date: {
         type: String,
         required: true,
     },
     timeSlot: {
        type: String,
        required: true,
     },
     status: String
})

const appoint = models.appoint || model('appoint', appointSchema);
export default appoint;
