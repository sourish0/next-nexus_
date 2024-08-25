import {Schema, model, models} from 'mongoose';

const doctorSchema = new Schema({
    field: String,
    name: String,
    organisation: String,
    age: String,
    contact: String,
    image: String,
    password: String,
    fees: String,
})

const Doctor = models.Doctor || model('Doctor', doctorSchema);
export default Doctor;