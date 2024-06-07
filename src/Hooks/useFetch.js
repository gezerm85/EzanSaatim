import axios from 'axios'
import React, { useEffect, useState } from 'react'




const useFetch = (url, options) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () =>{
        try {
            const responseData = await axios.get(url, options)
            setData(responseData.data)
            setLoading(false)
        } catch (error) {
            console.log("hata", error)
            setError(true)
        }
    }

    useEffect(()=>{
        fetchData()
    },[url])

    
  return {data, loading, error}
}

export default useFetch
