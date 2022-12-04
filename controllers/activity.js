
const { Activity } = require("../models/index")

class ActivityController {

    static async getAllActivity (req, res) {

        let dataStatus = 'success';
        let dataMessage = 'success';

        Activity.findAll()
        .then(result => {

            if (!result || result == null) {
                dataStatus = "failed"
                dataMessage = "failed"
            }
    
            const response = {
                status : dataStatus,
                message : dataMessage,
                data : result
            }

            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })



    }

    static async getOneActivity (req, res) {

        let dataStatus = 'success';
        let dataMessage = 'success';

        Activity.findByPk(req.params.id)
        .then(result => {

            if (!result || result == null) {
                dataStatus = "failed"
                dataMessage = "failed"
            }
    
            const response = {
                status : dataStatus,
                message : dataMessage,
                data : result
            }
    
            res.status(200).json(response)
           })
    
           .catch(err => {
            console.log(err);
           })
    }

    static createActivity (req, res) {

        let data = {
            email: req.body.email,
            title: req.body.title,
            deleted_at: null
        }

        const dataStatus = 'success';
        const dataMessage = 'success';
        Activity.create(data)
       .then(result => {

        if (!result || result == null) {
            dataStatus = "failed"
            dataMessage = "failed"
        }

        const response = {
            status : dataStatus,
            message : dataMessage,
            data : result
        }

        res.status(201).json(response)
       })

       .catch(err => {
        console.log(err);
       })

    }

    static async deleteActivity (req, res) {

        let idReq = +req.params.id
        Activity.findByPk(idReq)
        .then(result => {
            if(result === null) {

                let response = {
                    status : 'failed',
                    message : `Activity with ID ${idReq} Not Found`,
                    data : result
                }
        
                res.status(500).json(response)
            }
            else { 

                Activity.destroy({
                    where: {
                        id : idReq
                    }
                })
                .then(result => {
                    let response = {
                        status : 'success',
                        message : 'success',
                        data : result
                    }
                    res.status(200).json(response)
                })
                .catch(err => {
                    console.log(err);
                })

            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }

    static async updateActivity (req, res) {

        let idReq = +req.params.id
        let dataActivity = {
            title: req.body.title,
        }

        let dataStatus = 'success';
        let dataMessage = 'success';

        Activity.update(dataActivity, {
            where: {
                id: idReq
            },
            returning: true
        })
        .then(result => {

            if (!result || result == null) {
                dataStatus = "failed"
                dataMessage = "failed"
            }

            Activity.findByPk(idReq)
            .then(data => {
                const response = {
                    status : dataStatus,
                    message : dataMessage,
                    data : data
                }
    
                res.status(200).json(response)
            })
        })
        .catch(err => {
            res.status(400).json(err.message)
        })

    }

}

module.exports = ActivityController