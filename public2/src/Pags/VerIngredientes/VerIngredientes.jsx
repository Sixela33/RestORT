import React, { useEffect, useState } from 'react'
import { useApi } from '../../Context/APIContext'

export default function VerIngredientes() {
    const { user, fetchData } = useApi();
    const [ ingredientes, setIngredientes ] = useState(null)

    useEffect(
        async function hacercosas(){
        try {
            let rta = await fetchData('/api/ingredientes')
            rta = JSON.stringify(rta)
            console.log(rta)
            setIngredientes(rta)
            
        } catch (error) {
            console.log(error)
        }
    }
    , [])

  return (
    <div>{ingredientes}</div>
  )
}
