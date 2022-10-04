import React, { useState, useEffect } from "react"
import { Text, Box, Button, Heading, useDisclosure } from "@chakra-ui/react"

import { typeRegalo } from "./type/typeRegalo"
import datos from "./datos/regalos.json"
import ModalForm from "./components/modalForm"
import ListRegalos from "./components/listRegalos"

const App: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

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

  const addRegalo = (regalo: typeRegalo) => {
    console.log(regalo)
    setRegalos([...regalos, regalo])
  }
  const clearRegalos = () => {
    setRegalos([])
  }
  const deleteRegalo = (id: string) => {
    setRegalos(regalos.filter(item => item.id !== id))
  }

  return (
    <Box bg="white" p={2} w={"300px"}>
      <Heading>Regalos</Heading>
      <Button colorScheme="red" mb={2} w="100%" onClick={onOpen}>
        Agregar Regalo
      </Button>
      {regalos.length === 0 && <Text>Santa aun esta creando tu regalo .</Text>}

      {regalos.length !== 0 && (
        <>
          <ListRegalos deleteRegalo={deleteRegalo} regalos={regalos} />
          <Button colorScheme="red" w="100%" onClick={clearRegalos}>
            Borrar todo
          </Button>
        </>
      )}

      <ModalForm
        addRegalo={addRegalo}
        isOpen={isOpen}
        regalos={regalos}
        onClose={onClose}
      />
    </Box>
  )
}

export default App
