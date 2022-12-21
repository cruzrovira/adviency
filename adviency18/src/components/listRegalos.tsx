import { Button, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react"
import React from "react"

import { regalo } from "../types/regalo"
type props = {
  regalos: regalo[]
  deleteRegalo: (id: string) => void
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  onOpen: () => void
}
const ListRegalos: React.FC<props> = ({
  regalos,
  deleteRegalo,
  setRegalo,
  setIsUpdate,
  onOpen,
}) => {
  return (
    <VStack alignItems={"flex-start"} mt={2} spacing={2}>
      {regalos.map(item => (
        <HStack key={item.id} justifyContent={"space-between"} w="100%">
          <HStack>
            <Image
              fallbackSrc="https://via.placeholder.com/60"
              h="60px"
              src={item.image}
              w="60px"
            />
            <VStack alignItems={"flex-start"} spacing={-1}>
              <Text fontWeight={"bold"}>
                {item.nombre} ({item.cantidad}) - ${item.precio}
              </Text>
              <Text>{item.destinatario}</Text>
            </VStack>
          </HStack>
          <HStack>
            <Button
              size={"xs"}
              onClick={() => {
                setRegalo(item)
                setIsUpdate(true)
                onOpen()
              }}
            >
              E
            </Button>
            <Button
              size={"xs"}
              onClick={() => {
                deleteRegalo(item.id)
              }}
            >
              X
            </Button>
          </HStack>
        </HStack>
      ))}
      <Divider borderColor={"blackAlpha.500"} />
      <Text fontWeight={"bold"} textAlign={"center"} w="100%">
        Total : $
        {regalos.reduce((cc, item) => item.precio * item.cantidad + cc, 0)}
      </Text>
      <Button colorScheme={"red"} w="100%">
        Borrar todo
      </Button>
    </VStack>
  )
}

export default ListRegalos
