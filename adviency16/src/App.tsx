import React, { useEffect, useState } from "react"
import { Text, Box, Button, Heading, useDisclosure } from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import ModelForm from "./components/modelForm"
import { regalo } from "./types/regalo"
import { fetch } from "./api"
import ListRegalos from "./components/listRegalos"

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [regalos, setRegalos] = useState<regalo[]>()
  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    cantidad: 1,
    destinatario: "",
    image: "",
    nombre: "",
  })

  const addRegalo = () => {
    if (regalo.nombre.trim() === "") {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
      })
      return
    }
    const regaloRepetido = regalos?.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )

    if (regaloRepetido) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
      })
      return
    }

    regalos && setRegalos([...regalos, { ...regalo, id: uuid() }])
    onClose()
  }

  const updateRegalo = () => {
    const regaloOriginal = regalos?.find(item => item.id === regalo.id)
    if (regalo.nombre.trim() === "") {
      regaloOriginal && setRegalo(regaloOriginal)
      return
    }

    const listRegalos = regalos?.filter(item => item.id !== regalo.id)

    const regaloRepetido = listRegalos?.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )

    if (regaloRepetido) {
      regaloOriginal && setRegalo(regaloOriginal)
      return
    }

    regalos &&
      setRegalos(regalos.map(item => (item.id === regalo.id ? regalo : item)))
    onClose()
  }

  const deleteRegalo = (id: string) => {
    setRegalos(regalos?.filter(item => item.id !== id))
  }

  const clearRegalo = () => {
    setRegalos([])
  }

  useEffect(() => {
    const localRegalos = localStorage.getItem("regalos")
    localRegalos && setRegalos(JSON.parse(localRegalos))

    !localRegalos &&
      fetch().then(datos => {
        setTimeout(() => {
          setRegalos(datos)
        }, 1000)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  if (!regalos) {
    return (
      <Box bg={"white"} p={2} w={"300px"}>
        <Text color="gr" textAlign={"center"}>
          Crgando los datos ..
        </Text>
      </Box>
    )
  }

  return (
    <Box bg={"white"} p={2} w={"300px"}>
      <Heading>Regalos</Heading>
      <Button
        colorScheme={"red"}
        mb={2}
        w={"100%"}
        onClick={() => {
          setRegalo({
            id: "",
            cantidad: 1,
            destinatario: "",
            image: "",
            nombre: "",
          })
          setIsUpdate(false)
          onOpen()
        }}
      >
        Agregar Regalo
      </Button>

      {regalos?.length !== 0 && (
        <ListRegalos
          deleteRegalo={deleteRegalo}
          regalos={regalos}
          setIsUpdate={setIsUpdate}
          setRegalo={setRegalo}
          onOpen={onOpen}
        />
      )}
      {regalos?.length !== 0 && (
        <Button colorScheme={"red"} w="100%" onClick={clearRegalo}>
          Borrar Todo
        </Button>
      )}
      <ModelForm
        addRegalo={addRegalo}
        isOpen={isOpen}
        isUpdate={isUpdate}
        regalo={regalo}
        setRegalo={setRegalo}
        updateRegalo={updateRegalo}
        onClose={onClose}
      />
    </Box>
  )
}

export default App
