'use client'

import { useState, useEffect } from 'react'
import Loading from './Loading'

export default function ({ data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const commmonClass = "w-64 h-64 bg-c-black text-white"

  return isClient ?
    <div className={`${commmonClass}`}>

    </div> :
    <Loading twClasses={commmonClass} />
}

