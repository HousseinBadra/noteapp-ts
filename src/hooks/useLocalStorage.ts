import React, { useEffect, useState } from "react"


export function useLocalStorage<T>(key:string,value: T| (()=> T) ) {

const [data,setdata] = useState<T>(()=>{
    let local=localStorage.getItem(key)
    if(local !== null) return JSON.parse(local)

    if (typeof value === 'function'){
        return (value as () => T)()
    }
    return value
})

 useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(data))
 },[data,key])

 return [data,setdata] as [typeof data, typeof setdata]

}

