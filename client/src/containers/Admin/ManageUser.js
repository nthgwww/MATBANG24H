import React, { useEffect, useState } from 'react'
import Pagination from '../Public/Pagination'
import { apiGetUsers, apiGetRoles, apiUpdateUserByAdmin, apiDeleteUser } from '../../services/user'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ManageUser = () => {
    const [users, setUsers] = useState(null)
    const [edit, setEdit] = useState(null)
    const [update, setUpdate] = useState(false)
    const [searchParams] = useSearchParams()
    const [roles, setRoles] = useState(null)
    const [payload, setPayload] = useState({
        phone: '',
        role: '',
        name: ''
    })
    const fetchUsers = async (params) => {
        const response = await Promise.all([apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT_ADMIN }), apiGetRoles()])
        if (response[0].data?.err === 0) setUsers(response[0].data?.users)
        if (response[1].data?.err === 0) setRoles(response[1].data?.roles)
    }
    const handleUpdate = (user) => {
        setEdit(user)
        setPayload({
            phone: user?.phone,
            role: user?.role,
            name: user?.name
        })
    }
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) params.push(entry);
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (!edit) fetchUsers(searchParamsObject)
    }, [edit, update, searchParams])

    const deletePost = async (uid) => {
        const response = await apiDeleteUser(uid)
        if (response.data.success) {
            toast.success(response.mes)
            setUpdate(!update)
        } else toast.error(response.mes)
    }
    const handleSubmit = async () => {
        const response = await apiUpdateUserByAdmin(edit.id, payload)
        if (response.data.success) setEdit(null)
    }
    return (
        <div className='relative  bg-white p-4'>
            <div className='flex items-center justify-between gap-8 border-b'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý thành viên</h3>
                {edit?.id && <div className='flex items-center gap-4'>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='py-2 px-4 bg-blue-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                    >
                        <span>Update</span>
                    </button>
                    <button
                        type='button'
                        onClick={() => setEdit(null)}
                        className='py-2 px-4 bg-orange-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                    >
                        <span>Cancel</span>
                    </button>
                </div>}
            </div>
            <div className='py-4'>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr className='border-b border-t'>
                            <td className='p-2 font-bold'>STT</td>
                            <td className='p-2 font-bold'>Tên thành viên</td>
                            <td className='p-2 font-bold'>Phone</td>
                            <td className='p-2 font-bold'>Vai trò</td>
                            <td className='p-2 font-bold'>Số bài đăng</td>
                            <td className='p-2 font-bold'>Ngày tạo</td>
                            <td className='p-2 font-bold'>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.rows?.map((item, index) => (
                            <tr
                                key={item.id}
                            >
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <input
                                            type="text"
                                            value={payload.name}
                                            onChange={e => setPayload(prev => ({ ...prev, name: e.target.value }))}
                                            className='py-2 px-4 border rounded-md'
                                        />
                                        : <span>{item?.name}</span>}
                                </td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <input
                                            type="number"
                                            value={payload.phone}
                                            onChange={e => setPayload(prev => ({ ...prev, phone: e.target.value }))}
                                            className='py-2 px-4 border rounded-md'
                                        />
                                        : <span>{item?.phone}</span>}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <select className='border px-4 py-2 rounded-md' value={payload.role} onChange={e => setPayload(prev => ({ ...prev, role: e.target.value }))}>
                                            {roles?.map(el => (
                                                <option key={el.code} value={el.code}>{el.value}</option>
                                            ))}
                                        </select>
                                        : <span>{item?.roles?.value}</span>}
                                </td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.posts?.length}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item?.createdAt).format('DD/MM/yyyy')}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    <span
                                        className='p-2 cursor-pointer text-blue-500 hover:underline'
                                        onClick={() => handleUpdate(item)}
                                    >Sửa</span>
                                    <span
                                        className='p-2 cursor-pointer text-blue-500 hover:underline'
                                        onClick={() => deletePost(item.id)}
                                    >Xóa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users && <div className=''>
                <Pagination admin count={users?.count} posts={users?.rows} />
            </div>}
        </div>
    )
}

export default ManageUser