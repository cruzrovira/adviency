import {
  Input,
  Button,
  Text,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  HStack,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"

import datos from "./datos/regalos.json"
type typeRegalo = {
  id: number
  nombre: String
}

function App() {
  const [regalos, setRegalos] = useState<typeRegalo[]>([])
  const [regalo, setRegalo] = useState<string>("")

  useEffect(() => {
    setRegalos(datos)
  }, [])

  const handlerClick = (e: React.MouseEvent) => {
    alert("Hola")
    setRegalos([
      ...regalos,
      {
        id: regalos.length + 1,
        nombre: regalo,
      },
    ])
    setRegalo("")
  }
  return (
    <Box bg="white" p={2}>
      <Heading mb={2} textAlign="center">
        Regalos
      </Heading>
      <HStack mb={2}>
        <Input
          placeholder="regalo"
          value={regalo}
          onChange={e => setRegalo(e.target.value)}
        />
        <Button colorScheme={"red"} onClick={handlerClick}>
          Enviar
        </Button>
      </HStack>
      {regalos.length === 0 ? (
        <Text>Santa un esta construyendo tu regalo. </Text>
      ) : (
        <UnorderedList listStyleType="none">
          {regalos.map(regalo => (
            <ListItem key={regalo.id}>{regalo.nombre}</ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

export default App
