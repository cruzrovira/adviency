import {
  Text,
  Box,
  Heading,
  HStack,
  Input,
  Button,
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

  const clear = () => {
    setRegalos([])
  }

  return (
    <Box bg="white" p={2}>
      <Heading textAlign="center">Regalos</Heading>
      <HStack mb={2}>
        <Input
          placeholder="Regalo"
          value={regalo}
          onChange={e => setRegalo(e.target.value)}
        />
        <Button colorScheme="red" onClick={addRegalo}>
          Enviaar
        </Button>
      </HStack>
      {regalos.length === 0 ? (
        <Text>Santa esta construyento tu regalo.</Text>
      ) : (
        <UnorderedList
          maxH="200px"
          mb={2}
          overflowY="scroll"
          spacing={2}
          styleType="none"
        >
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
