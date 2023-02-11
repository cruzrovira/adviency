import { useEffect, useState } from "react"

import { fetch } from "../api"
import { regalo } from "../types/regalo"

const useRegalos = () => {
  const [regalos, setRegalos] = useState<regalo[]>()

  useEffect(() => {
    const localRegalos = localStorage.getItem("regalos")
    localRegalos
      ? setRegalos(JSON.parse(localRegalos))
      : setTimeout(() => {
          fetch().then(datos => {
            setRegalos(datos)
          })
        }, 2000)
  }, [])

  useEffect(() => {
    regalos && localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  return { regalos, setRegalos }
}

export { useRegalos }
