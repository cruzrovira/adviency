import { useState, useEffect } from "react"

import { fetch } from "../api"
import { regalo } from "../types/regalo"

const useRegalos = () => {
  const [regalos, setRegalos] = useState<regalo[]>()
  useEffect(() => {
    const localRegalos = localStorage.getItem("regalos")
    localRegalos
      ? setRegalos(JSON.parse(localRegalos))
      : setTimeout(() => {
          fetch().then(datos => setRegalos(datos))
        }, 2000)
  }, [])

  useEffect(() => {
    regalos && localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const addRegalos = (newRegalo: regalo) => {
    regalos && setRegalos([...regalos, newRegalo])
  }
  const clearRegalos = () => {
    setRegalos([])
  }
  const updateRegalos = (newUpdateRegalo: regalo) => {
    regalos &&
      setRegalos(
        regalos.map(item =>
          item.id !== newUpdateRegalo.id ? item : newUpdateRegalo
        )
      )
  }

  const deleteRegaloId = (id: string) => {
    regalos && setRegalos(regalos.filter(item => item.id !== id))
  }

  return {
    regalos,
    addRegalos,
    clearRegalos,
    updateRegalos,
    deleteRegaloId,
  }
}

export { useRegalos }
