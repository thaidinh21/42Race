let mongoose = require('mongoose');
const ActivityType = require('../shared/activity-type');

let Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    id: { type: Number, required: true, unique: true },
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String },
    distance: { type: Number },
    moving_time: { type: Number },
    elapsed_time: { type: Number },
    total_elevation_gain: { type: Number },
    type: { type: String, enum: ActivityType },
    workout_type: { type: Number },
    external_id: { type: String },
    upload_id: { type: Number },
    start_date: { type: Date },
    start_date_local: { type: Date },
    timezone: { type: String },
    utc_offset: { type: Number },
    start_latlng: {
        type: Schema.Types.Mixed
    },
    end_latlng: {
        type: Schema.Types.Mixed
    },
    location_city: { type: String },
    location_state: { type: String },
    location_country: { type: String },
    achievement_count: { type: Number },
    kudos_count: { type: Number },
    comment_count: { type: Number },
    athlete_count: { type: Number },
    photo_count: { type: Number },
    map: {
        type: Schema.Types.Mixed
    },
    trainer: { type: Boolean },
    commute: { type: Boolean },
    manual: { type: Boolean },
    private: { type: Boolean },
    flagged: { type: Boolean },
    gear_id: { type: String },
    from_accepted_tag: { type: Boolean },
    average_speed: { type: Number },
    max_speed: { type: Number },
    average_cadence: { type: Number },
    average_watts: { type: Number },
    weighted_average_watts: { type: Number },
    kilojoules: { type: Number },
    device_watts: { type: Boolean },
    has_heartrate: { type: Boolean },
    average_heartrate: { type: Number },
    max_heartrate: { type: Number },
    max_watts: { type: Number },
    pr_count: { type: Number },
    total_photo_count: { type: Number },
    has_kudoed: { type: Boolean },
    suffer_score: { type: Number },
});

module.exports = mongoose.model('Activity', ActivitySchema);