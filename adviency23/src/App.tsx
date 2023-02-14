import React, { useState } from "react"
import {
  Button,
  Heading,
  HStack,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"

import { useRegalos } from "./hooks/useRegalos"
import { regalo } from "./types/regalo"
import ModalForm from "./components/modalForm"
import ListRegalos from "./components/listRegalos"
import Sound from "./components/sound"
type props = {}
const App: React.FC<props> = () => {
  const { addRegalos, clearRegalos, deleteRegaloId, regalos, updateRegalos } =
    useRegalos()

  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    nombre: "",
    cantidad: 1,
    precio: 1,
    image: "",
    destinatario: "",
  })
  const [regaloState, setRegaloState] = useState<string>("add")
  const {
    isOpen: isOpenModalForm,
    onClose: onCloseModalForm,
    onOpen: onOpenModalForm,
  } = useDisclosure()

  if (!regalos) {
    return (
      <VStack bg={"white"} p={2} w={"400px"}>
        <Heading>Regalos</Heading>
        <Spinner color={"blue.500"} size={"xl"} />
      </VStack>
    )
  }

  return (
    <VStack bg={"white"} p={2} w={"400px"}>
      <HStack justifyContent={"space-between"} w={"100%"}>
        <Heading>Regalos</Heading>
        <Sound />
      </HStack>
      <Button
        colorScheme={"red"}
        w={"100%"}
        onClick={() => {
          setRegalo({
            id: "",
            nombre: "",
            cantidad: 1,
            precio: 1,
            image: "",
            destinatario: "",
          })
          setRegaloState("add")
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
        addRegalos={addRegalos}
        isOpenModalForm={isOpenModalForm}
        regalo={regalo}
        regaloState={regaloState}
        regalos={regalos}
        updateRegalos={updateRegalos}
        onCloseModalForm={onCloseModalForm}
      />
    </VStack>
  )
}

export default App
