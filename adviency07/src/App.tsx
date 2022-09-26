import {
  Text,
  Heading,
  Box,
  HStack,
  UnorderedList,
  ListItem,
  Button,
  Input,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

import datos from "./datos/regalos.json"

type typeRegalo = {
  id: string
  nombre: String
}

function App() {
  const [regalos, setRegalos] = useState<typeRegalo[]>([])
  const [regalo, setRegalo] = useState<string>("")

  useEffect(() => {
    setRegalos(datos)
  }, [])

  const errorValidate = () => {
    if (regalo.trim().length === 0) {
      setRegalo("")
      return true
    }
    const regaloEcontrado = regalos.find(
      item => item.nombre.toLowerCase() === regalo.toLowerCase()
    )

    if (regaloEcontrado) {
      setRegalo("")
      return true
    }
    return false
  }

  const addRegalo = () => {
    if (errorValidate()) {
      return
    }

    setRegalos([...regalos, { id: uuid(), nombre: regalo }])
    setRegalo("")
  }
  const deleteRegalo = (id: string) => {
    setRegalos(regalos.filter(item => item.id !== id))
  }
  const clear = () => {
    setRegalos([])
  }

  return (
    <Box bg="white" p={2}>
      <Heading textAlign={"center"}> Regalos</Heading>
      <HStack mb={2}>
        <Input value={regalo} onChange={e => setRegalo(e.target.value)} />
        <Button colorScheme={"red"} onClick={addRegalo}>
          Enviar
        </Button>
      </HStack>
      {regalos.length === 0 ? (
        <Text>Santa aun esta Contruyendo tu regalo</Text>
      ) : (
        <UnorderedList listStyleType="none" mb={2} spacing={2}>
          {regalos.map(item => (
            <ListItem key={item.id}>
              <HStack justifyContent="space-between">
                <Text>{item.nombre}</Text>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => deleteRegalo(item.id)}
                >
                  x
                </Button>
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      )}

      {regalos.length !== 0 && (
        <Button colorScheme="red" w="100%" onClick={clear}>
          Borrar todo
        </Button>
      )}
    </Box>
  )
}

export default App
