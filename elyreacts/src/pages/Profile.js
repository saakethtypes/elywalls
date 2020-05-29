import React, { useContext } from 'react'
import { ArtistProfile } from './ArtistProfile'
import { UserProfile } from './UserProfile'
import { GlobalContext } from '../context/GlobalState'

export const Profile = () => {
    const {user} = useContext(GlobalContext)
    let artist = (user.user_type=='buyer')?false:true
    
    return (
        <div>
            {artist?<ArtistProfile/>:<UserProfile/>}
        </div>
    )
}
