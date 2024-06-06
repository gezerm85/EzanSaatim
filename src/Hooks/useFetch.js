import axios from 'axios'
import React, { useEffect, useState } from 'react'



const useFetch = (url, options) => {
    const [data, setData] = useState([])

    const fetchData = async () =>{
        try {
            const responseData = await axios.get(url, options)
            setData(responseData.data)
        } catch (error) {
            console.log("hata", error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[url])

    
  return {data}
}

export default useFetch
