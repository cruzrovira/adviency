import {
  Text,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

import datos from "./datos/regalos.json"

type typeRegalo = {
  id: string
  nombre: string
}
function App() {
  const [regalos, setRegalos] = useState<typeRegalo[]>([])
  const [regalo, setRegalo] = useState<string>("")

  useEffect(() => {
    setRegalos(datos)
  }, [])

  const addRegalo = () => {
    setRegalos([...regalos, { id: uuid(), nombre: regalo }])
    setRegalo("")
  }
  const deleteRegalo = (id: string) => {
    setRegalos(regalos.filter(item => item.id !== id))
  }

  return (
    <Box bg="white" p={2}>
      <Heading textAlign="center">Regalos:</Heading>
      <HStack mb={2}>
        <Input
          placeholder="regalo"
          value={regalo}
          onChange={e => setRegalo(e.target.value)}
        />
        <Button colorScheme={"red"} onClick={addRegalo}>
          Enviar
        </Button>
      </HStack>
      {regalos.length === 0 ? (
        <Text>Santa un esta construyendo tu regalo .</Text>
      ) : (
        <UnorderedList listStyleType="none" spacing={2}>
          {regalos.map(item => (
            <ListItem key={item.id}>
              <HStack justifyContent={"space-between"}>
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
    </Box>
  )
}

export default App
