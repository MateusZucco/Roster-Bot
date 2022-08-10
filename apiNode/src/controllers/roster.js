// const users = require("../models/Users");
const Rosters = require("../models/Rosters");
const RosterItems = require("../models/RosterItems");
// const rosterItems = require("../models/RosterItems");
// const Sequelize = require('sequelize');

module.exports = {
    async create(req, res) {
        let rosterData = req.body.roster
        let itemsData = req.body.items
        try {

            let roster = await Rosters.create({ ...rosterData })

            itemsData.rosterId = roster.dataValues.id
            await RosterItems.create({ ...itemsData })

            let rosterItems = await RosterItems.findAll({ where: { rosterId: itemsData.rosterId } })

            return res.status(200).json({ roster: roster, items: rosterItems });

        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }

    },

    async newItem(req, res) {

        let newItem = req.body
        try {
            let roster = await Rosters.findOne({ where: { id: newItem.rosterId }, raw: true })
            newItem.position = roster.itemsNumber + 1
            await RosterItems.create(newItem)
            await Rosters.update({ itemsNumber: newItem.position}, {where: { id: roster.id } })
            let updatedRoster = await Rosters.findAll({
                where: { id: newItem.rosterId },
                include: [
                    {
                        model: RosterItems,
                        as: "rosterItems",
                    }],
                
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },
}