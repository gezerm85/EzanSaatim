import React, { useEffect, useState } from 'react'

const useFetchTime = () => {

    const [times, setTimes] = useState([])

    const timeData = async () =>{
        try {
            const responseData = await axios.get(url, options)
            setTimes(responseData.data)
        } catch (error) {
            console.log("err", error)
        }
    }

    useEffect(()=>{
        timeData()
    },[url])



  return {times}
}

export default useFetchTime
