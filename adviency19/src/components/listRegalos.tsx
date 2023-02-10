import { HStack, Image, VStack, Button, Text, Divider } from "@chakra-ui/react"
import React from "react"

import { regalo } from "../types/regalo"
type props = {
  regalos: regalo[]
  deleteRegaloId: (id: String) => void
  clearRegalos: () => void
  modalOnOpen: () => void
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  setregaloState: React.Dispatch<React.SetStateAction<string>>
}
const ListRegalos: React.FC<props> = ({
  regalos,
  clearRegalos,
  deleteRegaloId,
  modalOnOpen,
  setRegalo,
  setregaloState,
}) => {
  if (regalos.length === 0) {
    return (
      <Text color={"gray.500"}>Santa aun esta construyendo tu regalo!</Text>
    )
  }

  return (
    <VStack alignItems={"flex-start"} w="100%">
      {regalos.map(item => (
        <HStack key={item.id} justifyContent="space-between" w="100%">
          <HStack>
            <Image
              fallbackSrc="https://via.placeholder.com/60"
              h="60px"
              src={item.image}
              w="60px"
            />
            <VStack alignItems={"flex-start"} spacing={-1}>
              <Text fontWeight={"bold"}>
                {item.nombre} ({item.cantidad}) -
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
              title="Editar"
              onClick={() => {
                setregaloState("update")
                setRegalo(item)
                modalOnOpen()
              }}
            >
              E
            </Button>
            <Button
              size={"xs"}
              title="Duplicar"
              onClick={() => {
                setregaloState("double")
                setRegalo(item)
                modalOnOpen()
              }}
            >
              D
            </Button>
            <Button
              size={"xs"}
              title="Eliminar"
              onClick={() => deleteRegaloId(item.id)}
            >
              X
            </Button>
          </HStack>
        </HStack>
      ))}
      <Divider borderColor={"black"} />
      <Text fontWeight={"bold"} textAlign={"center"} w="100%">
        Total:
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(
          regalos.reduce((cc, item) => item.cantidad * item.precio + cc, 0)
        )}
      </Text>
      <Button colorScheme={"red"} w="100%" onClick={clearRegalos}>
        Borrar Regalos
      </Button>
    </VStack>
  )
}

export default ListRegalos
