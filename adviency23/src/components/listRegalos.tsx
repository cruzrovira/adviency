import {
  Button,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import React from "react"

import { regalo } from "../types/regalo"

import PreView from "./preView"
type props = {
  clearRegalos: () => void
  deleteRegaloId: (id: string) => void
  regalos: regalo[]
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  setRegaloState: React.Dispatch<React.SetStateAction<string>>
  onOpenModalForm: () => void
}
const ListRegalos: React.FC<props> = ({
  clearRegalos,
  deleteRegaloId,
  regalos,
  setRegalo,
  setRegaloState,
  onOpenModalForm,
}) => {
  const {
    isOpen: isOpenPreview,
    onClose: onClosePreview,
    onOpen: onOpenPreview,
  } = useDisclosure()

  if (regalos.length === 0) {
    return (
      <Text color={"gray.500"}>Santa aun esta trabajando en tu regalo</Text>
    )
  }

  return (
    <VStack spacing={2} w="100%">
      {regalos.map(item => (
        <HStack key={item.id} justifyContent={"space-between"} w="100%">
          <HStack>
            <Image
              alt={item.nombre}
              fallbackSrc="https://via.placeholder.com/60"
              h={"60px"}
              src={item.image}
              w="60px"
            />
            <VStack alignItems="flex-start" spacing={-1}>
              <Text>
                {item.nombre} ({item.cantidad}) -{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.precio)}
              </Text>
              <Text color={"gray"}>{item.destinatario}</Text>
            </VStack>
          </HStack>
          <HStack>
            <Button
              size={"xs"}
              onClick={() => {
                setRegalo(item)
                setRegaloState("update")
                onOpenModalForm()
              }}
            >
              E
            </Button>
            <Button
              size={"xs"}
              onClick={() => {
                setRegalo(item)
                setRegaloState("double")
                onOpenModalForm()
              }}
            >
              D
            </Button>
            <Button
              size={"xs"}
              onClick={() => {
                deleteRegaloId(item.id)
              }}
            >
              X
            </Button>
          </HStack>
        </HStack>
      ))}
      <Button colorScheme={"red"} w="100%" onClick={() => clearRegalos()}>
        Borrar todo los regalos
      </Button>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          onOpenPreview()
        }}
      >
        Vista previa
      </Button>
      <PreView
        isOpenPreview={isOpenPreview}
        regalos={regalos}
        onClosePreview={onClosePreview}
      />
    </VStack>
  )
}

export default ListRegalos
