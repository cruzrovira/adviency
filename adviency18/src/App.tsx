import React, { useEffect, useState } from "react"
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"

import { regalo } from "./types/regalo"
import { fetch } from "./api"
import ModalForm from "./components/modalForm"
import ListRegalos from "./components/listRegalos"

const App: React.FC = () => {
  const [regalos, setRegalos] = useState<regalo[]>()
  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    cantidad: 1,
    destinatario: "",
    image: "",
    nombre: "",
    precio: 1,
  })
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  useEffect(() => {
    const localRegalos = localStorage.getItem("regalos")
    localRegalos && setRegalos(JSON.parse(localRegalos))
    !localRegalos &&
      setTimeout(() => {
        fetch().then(datos => {
          setRegalos(datos)
        })
      }, 1000)
  }, [])

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const deleteRegalo = (id: string) => {
    setRegalos(regalos?.filter(item => item.id !== id))
  }

  const addRegalo = (newRegalo: regalo) => {
    regalos && setRegalos([...regalos, newRegalo])
  }
  const updateRegalo = (newUpdateRegalo: regalo) => {
    setRegalos(
      regalos?.map(item =>
        item.id !== newUpdateRegalo.id ? item : newUpdateRegalo
      )
    )
  }

  if (!regalos) {
    return (
      <Box bg="white" boxShadow="md" p={2} w={"400px"}>
        <Text textAlign={"center"}>Cargando los regalos...!</Text>
      </Box>
    )
  }

  return (
    <Box bg="white" boxShadow="md" p={2} w={"400px"}>
      <Heading>Regalos:</Heading>
      <Button
        colorScheme="red"
        w="100%"
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
        Agregar regalo
      </Button>
      {regalos && regalos.length > 0 && (
        <ListRegalos
          deleteRegalo={deleteRegalo}
          regalos={regalos}
          setIsUpdate={setIsUpdate}
          setRegalo={setRegalo}
          onOpen={onOpen}
        />
      )}
      <ModalForm
        addRegalo={addRegalo}
        isOpen={isOpen}
        isUpdate={isUpdate}
        regalo={regalo}
        regalos={regalos}
        setRegalo={setRegalo}
        updateRegalo={updateRegalo}
        onClose={onClose}
      />
    </Box>
  )
}

export default App
