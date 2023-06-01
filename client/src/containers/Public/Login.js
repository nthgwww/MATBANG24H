import React, { useState, useEffect } from 'react'
import { InputForm, Button, Loading } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'
import { apiForgotPassword } from '../../services'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([])
    const [isForgot, setIsForgot] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
        name: '',
        email
    })
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        setIsLoading(false)
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        setIsLoading(false)
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])

    const handleSubmit = async () => {
        setIsLoading(true)
        const { phone, name, ...data } = payload
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(data))
        else {
            setIsLoading(false)
            alert('Missing inputs')
        }
    }
    const handleForgotPassword = async () => {
        if (email) {
            const response = await apiForgotPassword({ email })
            Swal.fire('Almost...', response.data.mes, 'info').then(() => {
                setIsForgot(false)
            })
        } else alert('Hãy nhập mail...')
    }


    return (
        <div className='w-full flex items-center justify-center'>
            {isLoading && <div className='fixed top-0 right-0 left-0 bottom-0 bg-overlay-70 flex items-center justify-center'>
                <Loading />
            </div>}
            {isForgot && <div onClick={() => setIsForgot(false)} className='fixed top-0 right-0 left-0 bottom-0 bg-overlay-70 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='w-[600px] bg-white rounded-md p-4 flex flex-col gap-2'>
                    <span className='font-semibold'>Nhập email của bạn:</span>
                    <input type="text"
                        className='p-2 border rounded-md outline-none placeholder:text-sm placeholder:italic'
                        placeholder='Nhập email để có thể xác thực đổi mật khẩu'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            className='w-fit px-4 py-2 text-white font-bold bg-blue-500 rounded-md'
                            onClick={handleForgotPassword}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>}
            <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
                <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
                <div className='w-full flex flex-col gap-5'>
                    {isRegister && <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} label={'HỌ TÊN'}
                        value={payload.name}
                        setValue={setPayload}
                        keyPayload={'name'}
                        placeholder={'Họ tên của bạn hoặc tên nhà trọ'}
                    />}
                    {isRegister && <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'SỐ ĐIỆN THOẠI'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                        placeholder={'Nhập số điện thoại của bạn'}
                    />}
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'EMAIL'}
                        value={payload.email}
                        setValue={setPayload}
                        keyPayload={'email'}
                        placeholder='Email để lấy lại mật khẩu khi bị quên'
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'MẬT KHÂU'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                        placeholder={'Nhập mật khẩu'}
                    />
                    <Button
                        text={isRegister ? 'Đăng kí' : 'Đăng nhập'}
                        bgColor='bg-secondary1'
                        textColor='text-white'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className='mt-7 flex items-center justify-between'>
                    {isRegister
                        ? <small>Bạn đã có tài khoản? <span
                            onClick={() => {
                                setIsRegister(false)
                                setPayload({
                                    phone: '',
                                    password: '',
                                    name: ''
                                })
                            }}
                            className='text-blue-500 hover:underline cursor-pointer'
                        >
                            Đăng nhập ngay
                        </span></small>
                        : <>
                            <small onClick={() => setIsForgot(true)} className='text-[blue] hover:text-[red] cursor-pointer' >Bạn quên mật khẩu</small>
                            <small
                                onClick={() => {
                                    setIsRegister(true)
                                    setPayload({
                                        phone: '',
                                        password: '',
                                        name: ''
                                    })
                                }}
                                className='text-[blue] hover:text-[red] cursor-pointer'
                            >
                                Tạo tài khoản mới
                            </small>
                        </>}
                </div>

            </div>
        </div>
    )
}

export default Login