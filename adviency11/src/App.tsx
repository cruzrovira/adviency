import React, { useState, useEffect } from "react"
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"

import datos from "./datos/regalos.json"
import ListRegalo from "./componets/listRegalo"
import { typeRegalo } from "./type/regalos"
import ModalForm from "./componets/modalForm"

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [regalos, setRegalos] = useState<typeRegalo[]>((): typeRegalo[] => {
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

  const deleteRegalo = (id: string) => {
    setRegalos(regalos.filter(item => item.id !== id))
  }
  const clearRegalo = () => {
    setRegalos([])
  }
  const addRegalo = (regalo: typeRegalo) => {
    setRegalos([...regalos, regalo])
  }

  return (
    <Box bg="white" p={2} w="300px">
      <Heading>Regalos</Heading>
      <Button colorScheme="red" mb={2} w="100%" onClick={onOpen}>
        Agregar regalo
      </Button>
      {regalos.length === 0 ? (
        <Text>Santa un esta haciendo tu regalo</Text>
      ) : (
        <ListRegalo deleteRegalo={deleteRegalo} regalos={regalos} />
      )}

      <ModalForm
        addRegalo={addRegalo}
        isOpen={isOpen}
        regalos={regalos}
        onClose={onClose}
      />

      {regalos.length !== 0 && (
        <Button colorScheme="red" mt={2} w="100%" onClick={clearRegalo}>
          Borrar todo
        </Button>
      )}
    </Box>
  )
}

export default App
