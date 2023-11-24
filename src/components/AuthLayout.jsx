import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//basically this is like a container which will determine whether the children should be rendered or not.

export default function Protected({ children, authentication = true }) {

    const [loader, setloader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        //true     &&    ( false   !==   true )    -> true && true
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setloader(false)


        //or easier way is
        // authStatus === true ? navigate('/') : navigate('/login')


        //or do it like this
        // let authValue = authStatus === true ? true : false
        // if(authentication && authValue) navigate('/login')
        // else if(!authentication && authValue) navigate('/')


    }, [authStatus, navigate, authentication])



    return loader ? <h1>Loading...</h1> : <>{children}</>
}
