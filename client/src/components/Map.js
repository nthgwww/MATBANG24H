import React, { memo, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { HiLocationMarker } from 'react-icons/hi'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const Position = ({ icon }) => <div>{icon}</div>;

const Map = ({ address }) => {
    const [coords, setCoords] = useState(null)

    useEffect(() => {
        const getCoords = async () => {
            const results = await geocodeByAddress(address)
            const latLng = await getLatLng(results[0])
            console.log(latLng)
            setCoords(latLng)
        }
        if (address) {
            getCoords()
        } else {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                setCoords({ lat: latitude, lng: longitude })
            })
        }

    }, [address])

    return (
        <div className='h-[300px] w-full relative'>
            {address && <div className='absolute top-[8px] left-[8px] z-50 max-w-[200px] rounded-md bg-white shadow-md p-4 text-xs'>
                {address}
            </div>}
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={coords}
                defaultZoom={11}
                center={coords}
            >
                <Position
                    lat={coords?.lat}
                    lng={coords?.lng}
                    icon={<HiLocationMarker color='red' size={24} />}
                />
            </GoogleMapReact>
        </div>
    )
}

export default memo(Map)