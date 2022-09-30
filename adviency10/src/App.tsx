import { useEffect, useState } from "react"
import {
  Text,
  Box,
  Heading,
  HStack,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import datos from "./datos/regalos.json"

type typeRegalo = {
  id: string
  nombre: string
  cantidad: number
  image: string
}
function App() {
  const [regalos, setRegalos] = useState<typeRegalo[]>((): typeRegalo[] => {
    const datosLocales = localStorage.getItem("regalos")
    if (datosLocales) {
      return JSON.parse(datosLocales)
    } else {
      return datos
    }
  })
  const [regalo, setRegalo] = useState<typeRegalo>({
    id: "",
    nombre: "",
    cantidad: 1,
    image: "",
  })

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const addRegalo = () => {
    if (validateError()) {
      return
    }
    setRegalos([
      ...regalos,
      {
        id: uuid(),
        cantidad: regalo.cantidad,
        nombre: regalo.nombre,
        image: regalo.image,
      },
    ])
    setRegalo({ id: "", nombre: "", cantidad: 1, image: "" })
  }
  const validateError = (): boolean => {
    if (regalo.nombre.trim().length === 0) {
      setRegalo({ id: "", nombre: "", cantidad: 1, image: "" })
      return true
    }
    const regaloEncontrado = regalos.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )
    if (regaloEncontrado) {
      setRegalo({ id: "", nombre: "", cantidad: 1, image: "" })
      return true
    }

    return false
  }
  const deleteRegalos = (id: string) => {
    setRegalos(regalos.filter(item => item.id !== id))
  }
  const clearRegalos = () => {
    setRegalos([])
  }

  return (
    <Box bg="white" p={2}>
      <Heading>Regalos</Heading>
      <HStack mb={2}>
        <HStack>
          <Input
            placeholder="regalo"
            value={regalo.nombre}
            onChange={e => setRegalo({ ...regalo, nombre: e.target.value })}
          />
          <Input
            placeholder="htt://image"
            value={regalo.image}
            onChange={e => setRegalo({ ...regalo, image: e.target.value })}
          />
        </HStack>
        <NumberInput
          defaultValue={1}
          max={99}
          min={1}
          value={regalo.cantidad}
          w={70}
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
        <Text>Santa aun esta creando tu regalo</Text>
      ) : (
        <UnorderedList listStyleType="none" mb={2} spacing={2}>
          {regalos.map(item => (
            <ListItem key={item.id}>
              <HStack justifyContent="space-between">
                <HStack>
                  <Image
                    fallbackSrc="https://via.placeholder.com/60"
                    h="60px"
                    src={item.image}
                    w="60px"
                  />
                  <Text>{item.nombre}</Text>
                  <Text as="span">x{item.cantidad}</Text>
                </HStack>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => deleteRegalos(item.id)}
                >
                  x
                </Button>
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      )}

      {regalos.length !== 0 && (
        <Button colorScheme="red" w="100%" onClick={clearRegalos}>
          Borrar todo
        </Button>
      )}
    </Box>
  )
}

export default App
