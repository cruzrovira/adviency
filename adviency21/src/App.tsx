import React, { useState } from "react"
import {
  VStack,
  Heading,
  Spinner,
  useDisclosure,
  Button,
} from "@chakra-ui/react"

import { useRegalos } from "./hooks/useRegalos"
import { regalo } from "./types/regalo"
import ModalForm from "./components/modalForm"
import ListRegalos from "./components/listRegalos"

type props = {}
const App: React.FC<props> = () => {
  const {
    isOpen: isOpenModalForm,
    onOpen: onOpenModalForm,
    onClose: onCloseModalForm,
  } = useDisclosure()
  const [regaloState, setRegaloState] = useState<string>("add")
  const { regalos, setRegalos } = useRegalos()
  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    nombre: "",
    cantidad: 1,
    precio: 1,
    image: "",
    destinatario: "",
  })

  const clearRegalos = () => {
    setRegalos([])
  }
  const addRegalo = (newRegalo: regalo) => {
    regalos && setRegalos([...regalos, newRegalo])
  }
  const updateRegalo = (newUpdateRegalo: regalo) => {
    regalos &&
      setRegalos(
        regalos.map(item =>
          item.id !== newUpdateRegalo.id ? item : newUpdateRegalo
        )
      )
  }

  const deleteRgaloId = (id: string) => {
    regalos && setRegalos(regalos.filter(item => item.id !== id))
  }

  if (!regalos) {
    return (
      <VStack bg={"white"} p={2} spacing={2} w="400px">
        <Heading>Regalos</Heading>
        <Spinner color={"blue.500"} size={"xl"} />
      </VStack>
    )
  }

  return (
    <VStack bg={"white"} p={2} spacing={2} w="400px">
      <Heading>Regalos</Heading>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          setRegaloState("add")
          setRegalo({
            id: "",
            nombre: "",
            cantidad: 1,
            precio: 1,
            image: "",
            destinatario: "",
          })
          onOpenModalForm()
        }}
      >
        Agregar regalo
      </Button>
      <ListRegalos
        clearRegalos={clearRegalos}
        deleteRgaloId={deleteRgaloId}
        regalos={regalos}
        setRegalo={setRegalo}
        setRegaloState={setRegaloState}
        onOpenModalForm={onOpenModalForm}
      />
      <ModalForm
        addRegalo={addRegalo}
        isOpen={isOpenModalForm}
        regalo={regalo}
        regaloState={regaloState}
        regalos={regalos}
        updateRegalo={updateRegalo}
        onClose={onCloseModalForm}
      />
    </VStack>
  )
}

export default App
