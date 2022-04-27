const mongoose = require('mongoose');
const stavaService = require('./strava.service');
const ActivityModel = require('../database/activity.model');

const sync = async (req, res) => {
    const { accessToken, account } = req;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const activities = await stavaService.getListActivities(accessToken) || [];
        const updateOperators = [];
        activities.forEach(a=>{
            
            updateOperators.push({
                updateOne: {
                    filter : {id: a.id},
                    update : {
                        ...a,
                        account
                    },
                    upsert: true
                }
            })
        });
    
        await ActivityModel.bulkWrite(updateOperators);
        await session.commitTransaction();
        await session.endSession();
        res.status(204).send();

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        res.status(204).send(error.message);
    }

}

module.exports = {
    sync
}