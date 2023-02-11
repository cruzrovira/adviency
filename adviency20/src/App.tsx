import React, { useState } from "react"
import {
  Button,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"

import { useRegalos } from "./hooks/useRegalos"
import ListRegalos from "./components/listRegalos"
import { regalo } from "./types/regalo"
import ModalForm from "./components/modalForm"

type props = {}
const App: React.FC<props> = () => {
  const {
    isOpen: isOpenModalForm,
    onOpen: onOpenModalForm,
    onClose: onCloseModalForm,
  } = useDisclosure()

  const { regalos, setRegalos } = useRegalos()
  const [regaloState, setRegaloState] = useState<string>("add")

  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    cantidad: 1,
    destinatario: "",
    image: "",
    nombre: "",
    precio: 1,
  })

  const addRegalo = (newRegalo: regalo) => {
    regalos && setRegalos([...regalos, newRegalo])
  }
  const deleteRegaloId = (id: String) => {
    regalos && setRegalos(regalos.filter(item => item.id !== id))
  }
  const clearRegalos = () => {
    setRegalos([])
  }
  const updateRegalos = (updateRegaloItem: regalo) => {
    regalos &&
      setRegalos(
        regalos.map(item =>
          item.id !== updateRegaloItem.id ? item : updateRegaloItem
        )
      )
  }

  if (!regalos) {
    return (
      <VStack bgColor={"white"} boxShadow="sm" p={2} w={"400px"}>
        <Heading>Regalos</Heading>
        <Spinner color="blue" size={"xl"}></Spinner>
      </VStack>
    )
  }

  return (
    <VStack bgColor={"white"} boxShadow="sm" p={2} spacing={2} w={"400px"}>
      <Heading>Regalos</Heading>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          setRegaloState("add")
          setRegalo({
            id: "",
            cantidad: 1,
            destinatario: "",
            image: "",
            nombre: "",
            precio: 1,
          })
          onOpenModalForm()
        }}
      >
        Agregar Regalo
      </Button>
      <ListRegalos
        clearRegalos={clearRegalos}
        deleteRegaloId={deleteRegaloId}
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
        updateRegalos={updateRegalos}
        onClose={onCloseModalForm}
      />
    </VStack>
  )
}

export default App
