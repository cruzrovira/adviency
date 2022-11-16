import React, { useEffect, useState } from "react"
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"

import { regalo } from "./types/regalo"
import { fetch } from "./api"
import ModalForm from "./components/modalForm"

const App: React.FC = () => {
  const [regalos, setRegalos] = useState<regalo[]>()
  const [regalo, setRegalo] = useState<regalo>()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isUpdate, setIsUpdate] = useState<boolean>()

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

  if (!regalos) {
    return (
      <Box bg="white" boxShadow="md" p={2} w={"400px"}>
        <Text textAlign={"center"}>Cargando los regalos...!</Text>
      </Box>
    )
  }

  return (
    <Box bg="white" boxShadow="md" p={2} w={"400px"}>
      <Heading>Regalos</Heading>
      <Button
        colorScheme={"red"}
        mb={2}
        w="100%"
        onClick={() => {
          setIsUpdate(false)
          setRegalo({
            id: "",
            nombre: "Oscar",
            cantidad: 1,
            destinatario: "",
            image: "",
            precio: 1,
          })
          onOpen()
        }}
      >
        Agregar Regalo
      </Button>
      <ModalForm
        isOpen={isOpen}
        isUpdate={isUpdate}
        regalo={regalo}
        regalos={regalos}
        setRegalo={setRegalo}
        onClose={onClose}
      />
    </Box>
  )
}

export default App
