import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiResetPass } from '../../services/auth'
import Swal from 'sweetalert2'
import { path } from '../../ultils/constant'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const handleSubmit = async () => {
        const response = await apiResetPass({ token, password })
        if (response.data.err === 0) {
            setPassword('')
            Swal.fire('One more step', response.data.mes, 'success')
        } else Swal.fire('Oops', response.data.mes, 'error')

        navigate(`/${path.LOGIN}`)

    }
    return (
        <div className='py-8 min-h-screen flex flex-col justify-center items-center gap-4'>
            <div className='p-8 border rounded-md bg-white'>
                <img src='https://icon-library.com/images/reset-password-icon/reset-password-icon-29.jpg' alt="" className='w-[300px] object-contain' />
                <div className='flex flex-col gap-3'>
                    <label htmlFor="password" className='font-medium'>Nhập mật khẩu mới:</label>
                    <input
                        type="password"
                        className='py-2 px-4 rounded-md border bg-gray-100'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type='button'
                    className='py-2 px-4 rounded-md text-white bg-main font-semibold bg-blue-500 mt-4'
                    onClick={handleSubmit}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default ResetPassword