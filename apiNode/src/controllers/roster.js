const Users = require("../models/Users");
const Rosters = require("../models/Rosters");
const RosterItems = require("../models/RosterItems");
// const rosterItems = require("../models/RosterItems");
// const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        try {
            const user = await Users.findOne({ where: { telegramId: parseInt(req.params.userId) } })
            const rosters = await Rosters.findAll({
                where: { userId: user.id }, 
                include:{
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(rosters);

        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }

    },

    async create(req, res) {
        let rosterData = req.body.roster
        let itemsData = req.body.items
        try {

            let roster = await Rosters.create({ ...rosterData })

            itemsData.rosterId = roster.dataValues.id
            await RosterItems.create({ ...itemsData })

            let updatedRoster = await Rosters.findOne({
                where: { id: roster.id },
                include:{
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })

            return res.status(200).json(updatedRoster);

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
            await Rosters.update({ itemsNumber: newItem.position }, { where: { id: roster.id } })
            let updatedRoster = await Rosters.findAll({
                where: { id: newItem.rosterId },
                include:{
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async editItem(req, res) {
        let { newValue } = req.body
        let { rosterId, itemId } = req.params
        try {
            await RosterItems.update({ text: newValue }, { where: { id: itemId, rosterId: rosterId } })
            let updatedRoster = await Rosters.findAll({
                where: { id: rosterId },
                include:{
                    model: RosterItems,
                    as: "rosterItems",
                },
                order: [
                    [
                        { model: RosterItems, as: 'rosterItems' },
                        'position',
                        'ASC',
                    ],
                ],
            })
            return res.status(200).json(updatedRoster);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },

    async delete(req, res) {
        let { rosterId } = req.params
        try {
            console.log(rosterId)
            await Rosters.destroy({where:{ id:rosterId}})
            
            return res.status(200).json();
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },
}