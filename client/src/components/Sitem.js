import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { GrStar } from 'react-icons/gr'
import { path } from '../ultils/constant'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'

const Sitem = ({ title, price, image, createdAt, star, id }) => {

    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow()
    }
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        return stars

    }

    return (
        <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
            <img
                src={image[0]}
                alt="anh"
                className='w-[65px] h-[65px] object-cover flex-none rounded-md'
            />
            <div className='w-full flex-auto flex flex-col justify-between gap-1'>
                <h4 className='text-blue-600 text-[14px]'>
                    {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                        return (
                            <span key={number}>{star}</span>
                        )
                    })}
                    {`${title?.slice(0, 45)}...`}
                </h4>
                <div className=' flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    <span className='text-sm text-gray-300'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </Link>
    )
}

export default memo(Sitem)