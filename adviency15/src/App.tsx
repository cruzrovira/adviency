import React, { useEffect, useState } from "react"
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import { fetch } from "./api"
import { regalo } from "./types/regalo"
import ModalForm from "./components/modalForm"
import ListRegalo from "./components/listRegalo"

const App: React.FC = () => {
  const [regalos, setRegalos] = useState<regalo[]>()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    nombre: "",
    image: "",
    cantidad: 1,
    destinatario: "",
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const addRegalo = () => {
    if (regalo.nombre.trim() === "") {
      setRegalo({
        id: "",
        nombre: "",
        image: "",
        cantidad: 1,
        destinatario: "",
      })
      return
    }
    const regaloEncontrado = regalos?.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )
    if (regaloEncontrado) {
      setRegalo({
        id: "",
        nombre: "",
        image: "",
        cantidad: 1,
        destinatario: "",
      })
      return
    }

    regalos && setRegalos([...regalos, { ...regalo, id: uuid() }])
    setRegalo({ id: "", nombre: "", image: "", cantidad: 1, destinatario: "" })
    onClose()
  }
  const updateRegalo = () => {
    if (regalo.nombre.trim() === "") {
      setRegalo({
        id: "",
        nombre: "",
        image: "",
        cantidad: 1,
        destinatario: "",
      })
      return
    }
    const otrosRegalos = regalos?.filter(item => item.id !== regalo.id)

    const regaloEncontrado = otrosRegalos?.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )

    if (regaloEncontrado) {
      const regaloAnterior = regalos?.find(item => item.id === regalo.id)
      regalos &&
        setRegalo(
          regaloAnterior || {
            id: "",
            nombre: "",
            image: "",
            cantidad: 1,
            destinatario: "",
          }
        )
      return
    }

    regalos &&
      setRegalos(regalos.map(item => (item.id !== regalo.id ? item : regalo)))
    setRegalo({ id: "", nombre: "", image: "", cantidad: 1, destinatario: "" })
    onClose()
  }
  const deleteRegalo = (id: string) => {
    regalos && setRegalos(regalos.filter(item => item.id !== id))
  }

  return (
    <Box bg="white" boxShadow="md" p={2} w={"300px"}>
      {!regalos ? (
        <Text textAlign={"center"}>Cargando...</Text>
      ) : (
        <>
          <Heading>Regalos</Heading>
          <Button
            colorScheme={"red"}
            mb={2}
            w={"100%"}
            onClick={() => {
              setIsUpdate(false)
              setRegalo({
                id: "",
                nombre: "",
                image: "",
                cantidad: 1,
                destinatario: "",
              })
              onOpen()
            }}
          >
            Agregar Regalo
          </Button>
        </>
      )}
      <ListRegalo
        deleteRegalo={deleteRegalo}
        regalos={regalos}
        setIsUpdate={setIsUpdate}
        setRegalo={setRegalo}
        onOpen={onOpen}
      />
      <ModalForm
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
