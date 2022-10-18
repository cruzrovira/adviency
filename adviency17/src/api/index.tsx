import datos from "../datos/regalos.json"
import { regalo } from "../types/regalo"

const fetch = (): Promise<regalo[]> => {
  return Promise.resolve(datos)
}

export { fetch }
