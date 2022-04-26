
const configuration = {
    port: process.env.PORT || 8888,
    mongoUrl: process.env.MONGO_URL || "mongodb+srv://42race_dev:Fc800eRpaVW5og7d@42racecluster.gdkxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    stravaBaseURL: process.env.STRAVE_BASE_URL || "https://www.strava.com",
    stravaClientID: process.env.STRAVE_CLIENT_ID || '83020',
    stravaClientSecret: process.env.STRAVE_CLIENT_SECRET || '2ee46c0e6da0ce2d2c6b8ead3fdfee38694b2d99'
}

module.exports = configuration;