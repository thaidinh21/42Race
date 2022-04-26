let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const LoginSchema = new Schema({
    account:{type: Schema.Types.ObjectId, required: true},
    token_type: {type: String, default:'Bearer'},
    access_token: {type: String},
    expires_at: {type: Date},
    expires_in: {type: Number},
    refresh_token: {type: String}
});
module.exports = mongoose.model("Login", LoginSchema);