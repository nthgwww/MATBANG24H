import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/register',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/login',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiForgotPassword = (data) => axiosConfig({
    url: 'api/v1/auth/forgotpassword',
    method: 'put',
    data
})

export const apiResetPass = (data) => axiosConfig({
    url: 'api/v1/auth/resetpassword',
    method: 'put',
    data
})

