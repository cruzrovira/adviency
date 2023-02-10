import { useState, useEffect } from "react"
import {
  VStack,
  Heading,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/react"

import { fetch } from "./api"
import { regalo } from "./types/regalo"
import ListRegalos from "./components/listRegalos"
import ModalForm from "./components/modalForm"

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [regalos, setRegalos] = useState<regalo[]>()
  const [regaloState, setregaloState] = useState<string>("add")
  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    cantidad: 1,
    destinatario: "",
    image: "",
    nombre: "",
    precio: 1,
  })

  useEffect(() => {
    const memoryRegalo = localStorage.getItem("regalos")
    memoryRegalo
      ? setRegalos(JSON.parse(memoryRegalo))
      : setTimeout(() => {
          fetch().then(datos => {
            setRegalos(datos)
          })
        }, 2000)
  }, [])

  useEffect(() => {
    regalos && localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const clearRegalos = () => {
    setRegalos([])
  }

  const addRegalo = (newRegalo: regalo) => {
    regalos && setRegalos([...regalos, newRegalo])
  }
  const deleteRegaloId = (id: String) => {
    regalos && setRegalos(regalos.filter(item => item.id !== id))
  }

  const updateRegalo = (updateItemRegalo: regalo) => {
    regalos &&
      setRegalos(
        regalos.map(item =>
          item.id !== updateItemRegalo.id ? item : updateItemRegalo
        )
      )
  }

  if (!regalos) {
    return (
      <VStack bgColor={"white"} boxShadow={"md"} p={2} w={"400px"}>
        <Heading>Regalos</Heading>
        <Spinner color={"blue.500"} size={"xl"} />
      </VStack>
    )
  }

  return (
    <VStack bgColor={"white"} boxShadow={"md"} p={2} w={"400px"}>
      <Heading>Regalos</Heading>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          setregaloState("add")
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

      <ListRegalos
        clearRegalos={clearRegalos}
        deleteRegaloId={deleteRegaloId}
        modalOnOpen={onOpen}
        regalos={regalos}
        setRegalo={setRegalo}
        setregaloState={setregaloState}
      />
      <ModalForm
        addRegalo={addRegalo}
        isOpen={isOpen}
        regalo={regalo}
        regaloState={regaloState}
        regalos={regalos}
        updateRegalo={updateRegalo}
        onClose={onClose}
      />
    </VStack>
  )
}

export default App
