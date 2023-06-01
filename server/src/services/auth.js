import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require('dotenv').config()
import crypto from 'crypto'
import sendMail from './sendMail'

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({ phone, password, name, email }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                password: hashPassword(password),
                id: v4(),
                email,
                phone
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is successfully !' : 'Phone number has been aldready used !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})

export const loginService = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)
        const token = isCorrectPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully !' : response ? 'Password is wrong !' : 'Phone number not found !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})

export const forgotPassword = ({ email }) => new Promise(async (resolve, reject) => {
    try {
        const rs = await db.User.findOne({ where: { email } })
        if (rs) {
            const token = crypto.randomBytes(32).toString('hex')
            const subject = 'Quên mật khẩu'
            const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình reset mật khẩu.Link này sẽ hết hạn sau 5 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-mat-khau/${token}>Click here</a>`
            const updated = await db.User.update({
                rspasstk: token,
                rspassexp: Date.now() + 5 * 60 * 1000
            }, {
                where: { email }
            })
            resolve({
                err: updated[0] > 0 ? 0 : 1,
                mes: updated[0] ? 'Vui lòng check mail của bạn.' : 'Something went wrong!'
            })
            await sendMail({ email, html, subject })
        } else {
            reject({
                err: -1,
                mes: 'Email chưa được đăng ký!',
            })
        }

    } catch (error) {
        reject(error)
    }
})
export const resetPassword = ({ password, token }) => new Promise(async (resolve, reject) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
        const rs = await db.User.findOne({ where: { rspasstk: hashedToken } })
        if (rs) {
            const updated = await db.User.update(
                {
                    password: hashPassword(password),
                    rspasstk: null,
                    rspassexp: Date.now()
                },
                { where: { id: rs.id } }
            )
            resolve({
                err: updated[0] > 0 ? 0 : 1,
                mes: updated[0] > 0 ? 'Reset mật khẩu thành công.' : 'Something went wrong'
            })
        } else {
            resolve({
                err: 1,
                mes: 'Reset token invalid'
            })
        }
    } catch (error) {
        reject(error)
    }
})