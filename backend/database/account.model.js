let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let AccountSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    sex: { type: String, enum: ['F', 'M'] },
    premium: { type: Boolean, default: false },
    created_at: { type: Date },
    updated_at: { type: Date },
    badge_type_id: { type: Number },
    profile_medium: { type: String },
    profile: { type: String },
    measurement_preference: { type: String, enum: ['feet', 'meters'] },
    weight: { type: Number },
});
module.exports = mongoose.model('Account', AccountSchema);