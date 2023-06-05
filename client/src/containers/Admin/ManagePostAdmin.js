import { useEffect, useState } from 'react'
import { apiGetPostsLimit, apiUpdatePostByAdmin, apiDeletePostByAdmin } from '../../services'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../Public/Pagination'
import moment from 'moment'
import Swal from 'sweetalert2'

const ManagePostAdmin = () => {
    const [searchParams] = useSearchParams()
    const [posts, setPosts] = useState(null)
    const [edit, setEdit] = useState(null)
    const [update, setUpdate] = useState(false)
    const [payload, setPayload] = useState({
        title: '',
        address: '',
        price: '',
        area: '',
        isActived: ''
    })
    const fetchPosts = async (data) => {
        const response = await apiGetPostsLimit(data)
        if (response.data.err === 0) setPosts(response.data.response)
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
        searchParamsObject.limitPost = 10
        if (!edit) fetchPosts(searchParamsObject)
    }, [searchParams, edit, update])
    const handleSubmit = async () => {
        const response = await apiUpdatePostByAdmin(payload, edit.id, edit.attributesId)
        if (response.data.err === 0) setEdit(null)
    }
    const handleUpdate = (post) => {
        setEdit(post)
        setPayload({
            title: post?.title,
            address: post?.address,
            price: post?.priceNumber * 1000000,
            area: post?.areaNumber,
            isActived: post?.isActived
        })
    }
    const deletePost = async (pid) => {
        Swal.fire({
            title: 'Cảnh báo',
            titleText: 'Bạn có chắc muốn xóa bài đăng này?',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            denyButtonText: 'Quay lại'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeletePostByAdmin(pid)
                if (response.data.err === 0) setUpdate(!update)
            }
        })

    }
    return (
        <div className='relative  bg-white p-4'>
            <div className='flex items-center justify-between gap-8 border-b'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý bài đăng</h3>
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
                <table className="table-auto w-full mt-4 text-sm">
                    <thead>
                        <tr className='border-b border-t'>
                            <td className='p-2 font-bold'>STT</td>
                            <td className='p-2 font-bold'>Tựa đề</td>
                            <td className='p-2 font-bold'>Đánh giá</td>
                            <td className='p-2 font-bold'>Tác giả</td>
                            <td className='p-2 font-bold'>Giá (đồng/tháng)</td>
                            <td className='p-2 font-bold'>Diện tích (m2)</td>
                            <td className='p-2 font-bold'>Địa chỉ</td>
                            <td className='p-2 font-bold'>Ngày đăng</td>
                            <td className='p-2 font-bold'>Trạng thái</td>
                            <td className='p-2 font-bold'>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.rows?.map((item, index) => (
                            <tr
                                key={item.id}
                            >
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <input
                                            type="text"
                                            value={payload.title}
                                            onChange={e => setPayload(prev => ({ ...prev, title: e.target.value }))}
                                            className='py-2 px-4 border rounded-md w-full'
                                        />
                                        : <span>{item?.title}</span>}
                                </td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.star}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.user?.name}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <input
                                            type="number"
                                            value={payload.price}
                                            onChange={e => setPayload(prev => ({ ...prev, price: e.target.value }))}
                                            className='py-2 px-4 border rounded-md w-full'
                                        />
                                        : <span>{item?.attributes?.price}</span>}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <input
                                            type="number"
                                            value={payload.area}
                                            onChange={e => setPayload(prev => ({ ...prev, area: e.target.value }))}
                                            className='py-2 px-4 border rounded-md w-full'
                                        />
                                        : <span>{item?.attributes?.acreage}</span>}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <input
                                            type="text"
                                            value={payload.address}
                                            onChange={e => setPayload(prev => ({ ...prev, address: e.target.value }))}
                                            className='py-2 px-4 border rounded-md w-full'
                                        />
                                        : <span>{item?.address}</span>}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item?.createdAt).format('DD/MM/yyyy')}</td>

                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {edit?.id === item.id
                                        ? <select className='border px-4 py-2 rounded-md' value={payload.isActived} onChange={e => setPayload(prev => ({ ...prev, isActived: e.target.value }))}>
                                            <option value={''}>Trạng thái</option>
                                            <option value={true}>Active</option>
                                            <option value={false}>Processing</option>
                                        </select>
                                        : <span className={`line-clamp-1 text-center ${item?.isActived ? 'p-2 bg-green-600 text-white' : 'p-2 bg-orange-500 text-white'}`}>{item?.isActived ? 'Active' : 'Processing'}</span>}
                                </td>
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
            {posts && <div className=''>
                <Pagination admin count={posts?.count} posts={posts?.rows} />
            </div>}
        </div>
    )
}

export default ManagePostAdmin