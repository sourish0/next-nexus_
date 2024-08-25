import mongoose, { Schema, model, models } from 'mongoose';

const incidentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, required: true },
});


const Incident = models.Incident || model('Incident', incidentSchema);

export default Incident;
