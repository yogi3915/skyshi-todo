
const { Todo } = require("../models/index")

class TodoController {

    static async getAllTodo (req, res) {

        let dataStatus = 'Success';
        let dataMessage = 'Success';

        Todo.findAll()
        .then(result => {

            if (!result || result == null) {
                dataStatus = "Failed"
                dataMessage = "Failed"
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

    static async getOneTodo (req, res) {

        let dataStatus = 'Success';
        let dataMessage = 'Success';

        Todo.findByPk(req.params.id)
        .then(result => {

            if (!result || result == null) {
                dataStatus = "Failed"
                dataMessage = "Failed"
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

    static async createTodo (req, res) {

        let data = {
            title: req.body.title,
            activity_group_id: req.body.activity_group_id
        }

        const dataStatus = 'Success';
        const dataMessage = 'Success';
        Todo.create(data)
       .then(result => {

        if (!result || result == null) {
            dataStatus = "Failed"
            dataMessage = "Failed"
            res.status(500).json(result)
        }

        Todo.findByPk(result.id)
        .then(result => {
            let isActive = ""

            if (result.is_active == 1) {
                isActive = true
            } else {
                isActive = false
            }
            const response = {
                status : dataStatus,
                message : dataMessage,
                data : {
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    id: result.id,
                    title: result.title,
                    activity_group_id: +result.activity_group_id,
                    is_active: isActive,
                    priority: result.priority
                }
            }
    
            res.status(201).json(response)
        })
       })
       .catch(err => {
        res.status(500).json(err)
       })

    }

    static async deleteTodo (req, res) {

        let idReq = +req.params.id
        Todo.findByPk(idReq)
        .then(result => {
            if(result === null) {

                let response = {
                    status : 'failed',
                    message : `Todo with ID ${idReq} Not Found`,
                    data : result
                }
        
                res.status(500).json(response)
            }
            else { 

                Todo.destroy({
                    where: {
                        id : idReq
                    }
                })
                .then(result => {
                    let response = {
                        status : 'Success',
                        message : 'Success',
                        data : {}
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

    static async updateTodo (req, res) {

        let idReq = +req.params.id
        let isActive = ""

        console.log(req.body.is_active);

        if (req.body.is_active == "true") {
            isActive = 1
        } else {
            isActive = 0
        }

        let dataTodo = {
            title: req.body.title,
            activity_group_id: req.body.activity_group_id,
            deleted_at: null,
            is_active: isActive,
            priority: req.body.priority
        }

        let dataStatus = 'Success';
        let dataMessage = 'Success';

        Todo.update(dataTodo, {
            where: {
                id: idReq
            }
        })
        .then(result => {

            if (!result || result == null) {
                dataStatus = "Failed"
                dataMessage = "Failed"
            }

            Todo.findByPk(idReq)
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

module.exports = TodoController