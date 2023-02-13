import React, { useRef, useState } from "react"
import {
  VStack,
  Button,
  Heading,
  Spinner,
  useDisclosure,
  HStack,
} from "@chakra-ui/react"

import { useRegalos } from "./hooks/useRegalos"
import ModalForm from "./components/modalForm"
import { regalo } from "./types/regalo"
import ListRegalos from "./components/listRegalos"
import musica from "./assets/musica/Jingle_Bell_Rock.mp3"
import SoundIcon from "./icons/sound"
import SoundMuteIcon from "./icons/soundMute"

type props = {}
const App: React.FC<props> = () => {
  const soundRef = useRef<HTMLAudioElement>(null)
  const { regalos, addRegalo, clearRegalos, deleteRegaloId, updateRegalo } =
    useRegalos()

  const [sound, setSound] = useState<boolean>(false)

  const [regaloState, setRegaloState] = useState<string>("add")
  const [regalo, setRegalo] = useState<regalo>({
    id: "",
    cantidad: 1,
    destinatario: "",
    image: "",
    nombre: "",
    precio: 1,
  })

  const {
    isOpen: isOpenModalForm,
    onOpen: onOpenModalForm,
    onClose: onCloseModalForm,
  } = useDisclosure()

  if (!regalos) {
    return (
      <VStack bg={"white"} p={2} w="400px">
        <Heading>Regalos</Heading>
        <Spinner color={"blue.500"} size={"xl"} />
      </VStack>
    )
  }

  return (
    <VStack bg={"white"} p={2} w="400px">
      <HStack justifyContent={"space-between"} w="100%">
        <Heading>Regalos</Heading>
        {sound ? (
          <SoundIcon
            cursor="pointer"
            h={"32px"}
            w={"32px"}
            onClick={() => {
              soundRef.current?.pause()
              setSound(!sound)
            }}
          />
        ) : (
          <SoundMuteIcon
            cursor="pointer"
            h={"32px"}
            w={"32px"}
            onClick={() => {
              soundRef.current?.play()
              setSound(!sound)
            }}
          />
        )}
      </HStack>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          setRegalo({
            id: "",
            cantidad: 1,
            destinatario: "",
            image: "",
            nombre: "",
            precio: 1,
          })
          setRegaloState("add")
          onOpenModalForm()
        }}
      >
        Agregar regalo
      </Button>
      <ModalForm
        addRegalo={addRegalo}
        isOpenModalForm={isOpenModalForm}
        regalo={regalo}
        regaloState={regaloState}
        regalos={regalos}
        updateRegalo={updateRegalo}
        onCloseModalForm={onCloseModalForm}
      />
      <ListRegalos
        clearRegalos={clearRegalos}
        deleteRegaloId={deleteRegaloId}
        regalos={regalos}
        setRegalo={setRegalo}
        setRegaloState={setRegaloState}
        onOpenModalForm={onOpenModalForm}
      />
      <audio ref={soundRef} loop id="id-musica" src={musica}></audio>
    </VStack>
  )
}

export default App
