import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext'

export default function AllOrders() {
    let context = useContext(userContext);
    const { allordersfunc, allorders } = context;
    useEffect(() => {
        allordersfunc();
    }, [])
    console.log(allorders);
    return (
        <div className='container my-3'>AllOrders</div>
    )
}
