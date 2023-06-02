import * as services from '../services/user'

export const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await services.getOne(id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}
export const updateUser = async (req, res) => {
    const { id } = req.user
    const payload = req.body
    try {
        if (!payload) return res.status(400).json({
            err: 1,
            msg: 'Thiếu payload'
        })
        const response = await services.updateUser(payload, id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}
export const getUsers = async (req, res) => {
    try {
        const response = await services.getUsers(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}
export const getRoles = async (req, res) => {
    try {
        const response = await services.getRoles()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}
export const updateUserByAdmin = async (req, res) => {
    try {
        const { uid } = req.params
        const response = await services.updateUserByAdmin(req.body, uid)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}
export const deleteUserByAdmin = async (req, res) => {
    try {
        const { uid } = req.params
        const response = await services.deleteUserByAdmin(uid)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at user controller: ' + error
        })
    }
}