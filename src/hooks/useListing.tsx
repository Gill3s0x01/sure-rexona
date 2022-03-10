import { useEffect, useState } from 'react'
import { IListing } from '../interfaces'

export const useListing = () => {
  const [data, setData] = useState<IListing[] | undefined>()
  const [error, setError] = useState()

  useEffect(() => {
    fetch('https://api-sure.herokuapp.com/data')
      .then(res => res.json())
      .then(res => {
        setData(res.data.nodes)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
  }, [])

  return {
    data,
    error,
  }
}
