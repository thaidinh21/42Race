const mongoose = require('mongoose');
const stavaService = require('./strava.service');
const ActivityModel = require('../database/activity.model');
const AccountModel = require('../database/account.model');

const sync = async (req, res) => {
    const { accessToken, account } = req;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const activities = await stavaService.getListActivities(accessToken) || [];
        const updateOperators = [];
        activities.forEach(a => {

            updateOperators.push({
                updateOne: {
                    filter: { id: a.id },
                    update: {
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

const filter = async (req, res) => {
    const { filter } = req.body;
    let page = Number.parseInt(filter.page);
    if(Number.isNaN(page) || page <= 0){
       page = 0; 
    } else{
        page = page - 1;
    }
    
    const perPage = filter.perPage || 30;
    const type = filter.type;
    const user = filter.user;
    const modelFilter = {};
    if (type) {
        modelFilter['type'] = type;
    }

    if (user && user.name) {
        const nameSearch = new RegExp(user.name, "i")
        const accountFilters = {
            '$or': [
                { firstname: { $regex: nameSearch } },
                { lastname: { $regex: nameSearch } }
            ]
        };
        const accountIds = await AccountModel.find(accountFilters).select("_id").lean();
        if (accountIds && accountIds.length) {
            modelFilter['account'] = { $in: accountIds.map(i => i._id) };
        }
    }

    const execQuery = [];
   

    const activitieQuery = ActivityModel.find(modelFilter).select("-_id -account")
        .skip(page * perPage).limit(perPage).sort({
            start_date: -1
        });

    execQuery.push(activitieQuery);
    execQuery.push(ActivityModel.count(modelFilter));
    try {
        const [results, count] = await Promise.all(execQuery);
        res.json({
            results,
            pagination: {
                count,
                page: page + 1,
                perPage
            }
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteActivity = async (req, res) => {
    const activityId = req.params.activityId;
    if (!activityId) {
        return res.status(400).send("Activity Id is required");
    }
    try {
        const deleted = await ActivityModel.deleteOne({
            id: activityId
        });
        res.status(204).send("Deleted");
    } catch (error) {
        res.status(500).message(error)
    }
}

module.exports = {
    sync,
    filter,
    deleteActivity
}