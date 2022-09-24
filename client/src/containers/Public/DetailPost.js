import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { Slider } from '../../components'
import icons from '../../ultils/icons'
const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } = icons

const DetailPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)


    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }))
    }, [postId])
    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <Slider images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className='bg-white rounded-md shadow-md p-4'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-bold text-red-600'>{posts[0]?.title}</h2>
                        <div className='flex items-center gap-2'>
                            <span>Chuyên mục:</span>
                            <span className='text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer'>{posts[0]?.overviews?.area}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <HiLocationMarker color='#2563eb' />
                            <span>{posts[0]?.address}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                <span className='font-semibold text-lg text-green-600'>{posts[0]?.attributes?.price}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                <span>{posts[0]?.attributes?.acreage}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <BsStopwatch />
                                <span>{posts[0]?.attributes?.published}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <BsHash />
                                <span>{posts[0]?.attributes?.hashtag}</span>
                            </span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        <div className='flex flex-col gap-3'>
                            {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })}
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
                        <table className='w-full'>
                            <tbody className='w-full'>
                                <tr className='w-full'>
                                    <td className='p-2'>Mã tin</td>
                                    <td className='p-2'>{posts[0]?.overviews?.code}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Khu vực</td>
                                    <td className='p-2'>{posts[0]?.overviews?.area}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Loại tin rao</td>
                                    <td className='p-2'>{posts[0]?.overviews?.type}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Đối tượng</td>
                                    <td className='p-2'>{posts[0]?.overviews?.target}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Gói tin</td>
                                    <td className='p-2'>{posts[0]?.overviews?.bonus}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Ngày đăng</td>
                                    <td className='p-2'>{posts[0]?.overviews?.created}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Ngày hết hạn</td>
                                    <td className='p-2'>{posts[0]?.overviews?.expired}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
                        <table className='w-full'>
                            <tbody className='w-full'>
                                <tr className='w-full'>
                                    <td className='p-2'>Liên hệ</td>
                                    <td className='p-2'>{posts[0]?.user?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Điện thoại</td>
                                    <td className='p-2'>{posts[0]?.user?.phone}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Zalo</td>
                                    <td className='p-2'>{posts[0]?.user?.zalo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Bản đồ</h3>

                    </div>
                </div>

            </div>
            <div className='w-[30%]'>
                sidebar
            </div>
        </div>
    )
}

export default DetailPost