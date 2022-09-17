import React from 'react'

const InputFormV2 = ({ label, unit, value, setValue, name, small, invalidFields, setInvalidFields }) => {
    return (
        <div>
            <label htmlFor="title">{label}</label>
            <div className='flex items-center'>
                <input
                    type="text"
                    id=" title"
                    className={`${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none border flex-auto border-gray-300 p-2`}
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    onFocus={() => setInvalidFields([])}
                />
                {unit && <span className='p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200'>{unit}</span>}
            </div>
            {small && <small className='opacity-70 whitespace-nowrap'>{small}</small>}
            <small className='text-red-500 block w-full'>
                {invalidFields?.some(item => item.name === name) && invalidFields?.find(item => item.name === name)?.message}
            </small>
        </div>
    )
}

export default InputFormV2