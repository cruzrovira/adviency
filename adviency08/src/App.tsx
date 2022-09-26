import { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"
import {
  Box,
  Text,
  Input,
  Button,
  UnorderedList,
  ListItem,
  HStack,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

import datos from "./datos/regalos.json"

type tyRegalo = {
  id: string
  nombre: string
  cantidad: number
}
function App() {
  const [regalos, setRegalos] = useState<tyRegalo[]>([])
  const [regalo, setRegalo] = useState<tyRegalo>({
    id: "",
    nombre: "",
    cantidad: 1,
  })

  useEffect(() => {
    setRegalos(datos)
  }, [])

  const addRegalo = () => {
    if (errorValida()) {
      return
    }
    setRegalos([...regalos, { ...regalo, id: uuid() }])
    setRegalo({ id: "", nombre: "", cantidad: 1 })
  }
  const deleteRegalo = (id: string) => {
    setRegalos(regalos.filter(item => item.id !== id))
  }
  const clear = () => {
    setRegalos([])
  }
  const errorValida = () => {
    if (regalo.nombre.trim().length === 0) {
      setRegalo({ id: "", nombre: "", cantidad: 1 })
      return true
    }
    const regaloEncontrado = regalos.find(
      item => item.nombre.toUpperCase() === regalo.nombre.toUpperCase()
    )
    if (regaloEncontrado) {
      setRegalo({ id: "", nombre: "", cantidad: 1 })
      return true
    }

    return false
  }
  return (
    <Box bg="white" p={2}>
      <Heading textAlign="center">Regalos</Heading>
      <HStack mb={2}>
        <Input
          value={regalo.nombre}
          onChange={e => setRegalo({ ...regalo, nombre: e.target.value })}
        />
        <NumberInput
          defaultValue={1}
          max={99}
          min={1}
          value={regalo.cantidad}
          w={110}
          onChange={cantidadSting =>
            setRegalo({ ...regalo, cantidad: Number(cantidadSting) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme="red" onClick={addRegalo}>
          Enviar
        </Button>
      </HStack>
      {regalos.length === 0 ? (
        <text>Santa aun esta construyento tu regalo.</text>
      ) : (
        <UnorderedList listStyleType="none" mb={2} spacing={2}>
          {regalos.map(item => (
            <ListItem key={item.id}>
              <HStack justifyContent="space-between">
                <HStack>
                  <Text>{item.nombre}</Text>
                  <Text as="span">x{item.cantidad}</Text>
                </HStack>
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
          Borrar Todo
        </Button>
      )}
    </Box>
  )
}

export default App
