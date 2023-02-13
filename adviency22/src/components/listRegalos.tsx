import {
  Button,
  Divider,
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
  regalos,
  clearRegalos,
  deleteRegaloId,
  onOpenModalForm,
  setRegalo,
  setRegaloState,
}) => {
  const {
    isOpen: isOpenPreView,
    onOpen: onOpenPreView,
    onClose: onClosePreView,
  } = useDisclosure()

  return (
    <VStack spacing={2} w="100%">
      {regalos.map(item => (
        <HStack key={item.id} justifyContent={"space-between"} w="100%">
          <HStack>
            <Image
              alt={item.nombre}
              fallbackSrc={"https://via.placeholder.com/60"}
              h={"60px"}
              src={item.image}
              w={"60px"}
            />
            <VStack alignItems="flex-start" spacing={-1}>
              <Text>
                {item.nombre} ({item.cantidad}) -{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.precio)}
              </Text>
              <Text>{item.destinatario}</Text>
            </VStack>
          </HStack>
          <HStack>
            <Button
              size={"xs"}
              onClick={() => {
                setRegaloState("update")
                setRegalo(item)
                onOpenModalForm()
              }}
            >
              E
            </Button>
            <Button
              size={"xs"}
              onClick={() => {
                setRegaloState("double")
                setRegalo(item)
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
      <Divider borderColor={"gray.500"} />
      <Text fontWeight={"bold"}>
        Total:
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(
          regalos.reduce((cc, item) => item.cantidad * item.precio + cc, 0)
        )}
      </Text>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          clearRegalos()
        }}
      >
        Borrar todo
      </Button>
      <Button
        colorScheme={"red"}
        w="100%"
        onClick={() => {
          onOpenPreView()
        }}
      >
        Previsualizar
      </Button>
      <PreView
        isOpenPreView={isOpenPreView}
        regalos={regalos}
        onClosePreView={onClosePreView}
      />
    </VStack>
  )
}

export default ListRegalos
