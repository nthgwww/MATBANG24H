import db from '../models'
import { Op } from 'sequelize'

// GET CURRENT
export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const updateUser = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Updated' : 'Failed to update user.',
        })
    } catch (error) {
        reject(error)
    }
})
export const getUsers = ({ page, limit, order, name, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = {}
        const step = !page ? 0 : (+page - 1)
        queries.limit = +limit || +process.env.USER_LIMIT
        queries.offset = step * queries.limit
        if (name) query.name = { [Op.substring]: name }
        if (order) queries.order = [order]

        const response = await db.User.findAndCountAll({
            where: query,
            ...queries,
            include: [
                { model: db.Role, as: 'roles', attributes: ['value', 'code'] },
                { model: db.Post, as: 'posts', attributes: ['id'] },
            ],
            distinct: true,
            attributes: {
                exclude: ['password', 'rspasstk', 'rspassexp'],
            }
        })
        resolve({
            err: response ? 0 : 1,
            users: response ? response : 'Cannot get users'
        })
    } catch (error) {
        reject(error)
    }
})
export const getRoles = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Role.findAll()
        resolve({
            err: response ? 0 : 1,
            roles: response ? response : 'Cannot get roles'
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUserByAdmin = (data, uid) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(data, { where: { id: uid } })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            user: response[0] > 0 ? response : 'No user updated'
        })
    } catch (error) {
        reject(error)
    }
})
export const deleteUserByAdmin = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.destroy({ where: { id } })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Xóa user thành công' : 'No user deleted'
        })
    } catch (error) {
        reject(error)
    }
})