import React, { useEffect, useState } from "react"
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import { regalo } from "./types/regalo"
import datos from "./datos/regalos.json"
import ModalForm from "./components/modalForm"
import ListRegalo from "./components/listRegalo"

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [onupdate, setOnUpdate] = useState<boolean>(false)

  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    cantidad: 1,
    destinatario: "",
    image: "",
    nombre: "",
  })

  const [regalos, setRegalos] = useState<regalo[]>((): regalo[] => {
    const localRegalos = localStorage.getItem("regalos")
    if (localRegalos) {
      return JSON.parse(localRegalos)
    } else {
      return datos
    }
  })

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const addRegalo = () => {
    if (regalo.nombre.trim().length === 0) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
      })
      return
    }
    const regaloEncontrado = regalos.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )

    if (regaloEncontrado) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
      })
      return
    }

    setRegalos([...regalos, { ...regalo, id: uuid() }])
    setRegalo({ id: "", cantidad: 1, destinatario: "", image: "", nombre: "" })
    onClose()
  }
  const deleteRegalo = (id: string): void => {
    setRegalos(regalos.filter(item => item.id !== id))
  }
  const clearRegalos = (): void => {
    setRegalos([])
  }
  const updateRegalo = (): void => {
    if (regalo.nombre.trim().length === 0) {
      setRegalo({
        id: "",
        cantidad: 1,
        destinatario: "",
        image: "",
        nombre: "",
      })
      return
    }

    const otrosRegalos = regalos.filter(item => item.id !== regalo.id)

    const regaloEncontrado = otrosRegalos.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )

    if (regaloEncontrado) {
      const regaloAnterior = regalos.find(item => item.id === regalo.id)
      setRegalo(
        regaloAnterior || {
          id: "",
          cantidad: 1,
          destinatario: "",
          image: "",
          nombre: "",
        }
      )
      return
    }

    setRegalos(regalos.map(item => (item.id === regalo.id ? regalo : item)))
    setRegalo({ id: "", cantidad: 1, destinatario: "", image: "", nombre: "" })
    onClose()
  }

  return (
    <Box bg={"white"} p={2} w="300px">
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
          setOnUpdate(false)
          onOpen()
        }}
      >
        Agregar Regalo
      </Button>

      {regalos.length !== 0 && (
        <ListRegalo
          deleteRegalo={deleteRegalo}
          regalos={regalos}
          setOnUpdate={setOnUpdate}
          setRegalo={setRegalo}
          onOpen={onOpen}
        />
      )}

      {regalos.length === 0 && <Text>Santa aun esta Creando tu regalo.</Text>}

      {regalos.length !== 0 && (
        <Button colorScheme={"red"} w="100%" onClick={clearRegalos}>
          Borrar todos los reagalos
        </Button>
      )}

      <ModalForm
        addRegalo={addRegalo}
        isOpen={isOpen}
        onupdate={onupdate}
        regalo={regalo}
        setRegalo={setRegalo}
        updateRegalo={updateRegalo}
        onClose={onClose}
      />
    </Box>
  )
}

export default App
