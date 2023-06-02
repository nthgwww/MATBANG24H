import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdateUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetUsers = (params) => axios({
    url: '/api/v1/user/',
    params,
    method: 'get'
})
export const apiGetRoles = () => axios({
    url: '/api/v1/user/roles',
    method: 'get'
})
export const apiUpdateUserByAdmin = (uid) => axios({
    url: '/api/v1/user/update-admin/' + uid,
    method: 'put'
})
export const apiDeleteUser = (uid) => axios({
    url: '/api/v1/user/' + uid,
    method: 'delete'
})