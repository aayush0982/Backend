// import { headers } from "next/headers"

import axios from "axios"


const Base_Url = 'https://places.googleapis.com/v1/places:searchText'

const config= {
    headers:{
        'Content-Type' : 'application/json',
        'X-Goog-Api-Key' : process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
        'X-Goog-FieldMask' : [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails = (data) =>axios.post(Base_Url,data,config)