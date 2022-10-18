import React, { useEffect, useState } from "react"
import { Text, Box, useDisclosure, Heading, Button } from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import { fetch } from "./api"
import { regalo } from "./types/regalo"
import ModalForm from "./components/modalForm"
import ListRegalo from "./components/listRegalo"

const App: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [regalo, setRegalo] = useState<regalo>()
  const [regalos, setRegalos] = useState<regalo[]>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    const regalosLocal = localStorage.getItem("regalos")
    regalosLocal && setRegalos(JSON.parse(regalosLocal))

    !regalosLocal &&
      setTimeout(() => {
        fetch().then(datos => {
          setRegalos(datos)
        })
      }, 2000)
  }, [])

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const addRegalos = () => {
    if (regalo?.nombre.trim().length === 0) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
        precio: 1,
      })
      return undefined
    }

    const regalosEncontrado = regalos?.find(
      item => item.nombre.toLowerCase() === regalo?.nombre.toLowerCase()
    )
    if (regalosEncontrado) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
        precio: 1,
      })
      return undefined
    }

    regalos && regalo && setRegalos([...regalos, { ...regalo, id: uuid() }])
    onClose()
  }
  const updateRegalos = () => {
    if (regalo?.nombre.trim().length === 0) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
        precio: 1,
      })
      return undefined
    }
    const otrosRegalos = regalos?.filter(item => item.id !== regalo?.id)
    const regalosEncontrado = otrosRegalos?.find(
      item => item.nombre.toLowerCase() === regalo?.nombre.toLowerCase()
    )
    if (regalosEncontrado) {
      setRegalo(regalos?.find(item => item.id === regalo?.id))
      return undefined
    }

    regalos &&
      regalo &&
      setRegalos(regalos.map(item => (item.id === regalo.id ? regalo : item)))
    onClose()
  }
  const deleteRegalos = (id: string) => {
    setRegalos(regalos?.filter(item => item.id !== id))
  }
  const clearRegalos = () => {
    setRegalos([])
  }

  if (!regalos) {
    return (
      <Box bg={"white"} boxShadow={"md"} p={2} w="400px">
        <Text textAlign={"center"}>Cargando ...</Text>
      </Box>
    )
  }

  return (
    <Box bg={"white"} boxShadow={"md"} p={2} w="400px">
      <Heading>Regalos</Heading>
      <Button
        colorScheme={"red"}
        mb={2}
        w={"100%"}
        onClick={() => {
          setIsUpdate(false)
          setRegalo({
            id: "",
            cantidad: 1,
            destinatario: "",
            image: "",
            nombre: "",
            precio: 1,
          })
          onOpen()
        }}
      >
        Agregar Regalo
      </Button>
      {regalos.length !== 0 && (
        <ListRegalo
          deleteRegalos={deleteRegalos}
          regalos={regalos}
          setIsUpdate={setIsUpdate}
          setRegalo={setRegalo}
          onOpen={onOpen}
        />
      )}

      {regalos.length !== 0 && (
        <Button colorScheme={"red"} w="100%" onClick={() => clearRegalos()}>
          Borra todo
        </Button>
      )}
      <ModalForm
        addRegalos={addRegalos}
        isOpen={isOpen}
        isUpdate={isUpdate}
        regalo={regalo}
        setRegalo={setRegalo}
        updateRegalos={updateRegalos}
        onClose={onClose}
      />
    </Box>
  )
}

export default App
