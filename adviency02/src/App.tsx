import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import datos from "./datos/regalos.json"

type typeRegalo = {
  id: number
  nombre: string
}

function App() {
  const [regalos, setRegalos] = useState<typeRegalo[]>([])

  useEffect(() => {
    setRegalos(datos)
  }, [])

  return (
    <Box bg="white" px={20} py={2}>
      <Heading mb={2} textAlign="center">
        Regalos
      </Heading>
      {regalos.length === 0 ? (
        <Text> Santa aun esta fabricando tu regalo.</Text>
      ) : (
        <UnorderedList listStyleType={"none"}>
          {regalos.map(regalo => (
            <ListItem key={regalo.id}>{regalo.nombre}</ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

export default App
