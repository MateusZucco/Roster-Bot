// const users = require("../models/Users");
const Rosters = require("../models/Rosters");
const RosterItems = require("../models/RosterItems");
// const rosterItems = require("../models/RosterItems");
// const Sequelize = require('sequelize');

module.exports = {
    async create(req, res){
        let roster = req.body.roster
        let items = req.body.items
        try {
            console.log(items)
            let result = await Rosters.create({...roster})
            items.rosterId = result.dataValues.id
            console.log(items)
            let resultItems = await RosterItems.create({...items})
            return res.status(200).json({roster: result, items: resultItems});
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },
    async newItem(req, res){
        let newItem = req.body
        try {
            await RosterItems.create({newItem})
        } catch (err) {
            console.log(err)
        }
    },
}