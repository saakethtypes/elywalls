import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

/*eslint-disable*/
export const Confirm = ({utype,token,props}) => {

    const {confirmAcc} = useContext(GlobalContext)
    useEffect(() => {
        confirmAcc(utype,token,props)

    }, [])
    return (
        <div>
            <h1>Confirming Account.</h1>
        </div>
    )
}
