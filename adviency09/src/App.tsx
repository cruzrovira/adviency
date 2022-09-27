import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"

import datos from "./datos/regalos.json"

type typeRegalo = {
  id: string
  nombre: string
  cantidad: number
}
function App() {
  const [regalos, setRegalos] = useState<typeRegalo[]>([])

  const [regalo, setRegalo] = useState<typeRegalo>({
    id: "",
    nombre: "",
    cantidad: 1,
  })

  const loadData = () => {
    const localRegalos = localStorage.getItem("regalos")
    if (localRegalos) {
      setRegalos(JSON.parse(localRegalos))
    } else {
      setRegalos(datos)
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const addRegalo = () => {
    if (errorValidate()) {
      return
    }
    setRegalos([...regalos, { ...regalo, id: uuid() }])
    setRegalo({ id: "", nombre: "", cantidad: 1 })
  }

  const errorValidate = () => {
    if (regalo.nombre.trim() === "") {
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
  const deleteRegalo = (id: string) => {
    setRegalos(regalos.filter(ListItem => ListItem.id !== id))
  }
  const clearRegalo = () => {
    setRegalos([])
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
          w={120}
          onChange={cantidadString =>
            setRegalo({ ...regalo, cantidad: Number(cantidadString) })
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
        <Text>Santa aun esta construyendo tu regalo.</Text>
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
        <Button colorScheme="red" w="100%" onClick={clearRegalo}>
          Borar Todo
        </Button>
      )}
    </Box>
  )
}

export default App
