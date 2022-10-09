import React from "react"
import {
  Button,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"

import { regalo } from "../types/regalo"

type props = {
  regalos: regalo[]
  onOpen: () => void
  setOnUpdate: React.Dispatch<React.SetStateAction<boolean>>
  deleteRegalo: (id: string) => void
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
}
const ListRegalo: React.FC<props> = ({
  regalos,
  deleteRegalo,

  setRegalo,
  onOpen,
  setOnUpdate,
}) => {
  return (
    <UnorderedList listStyleType={"none"} mb={2} spacing={2}>
      {regalos.map(item => (
        <ListItem key={item.id}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Image
                fallbackSrc="https://via.placeholder.com/60"
                src={item.image}
              />
              <VStack alignItems={"flex-start"} spacing={0}>
                <Text fontWeight={"bold"}>{item.nombre}</Text>
                <Text as={"span"}>{item.destinatario}</Text>
              </VStack>
              <Text as={"span"}>x{item.cantidad}</Text>
            </HStack>
            <HStack>
              <Button
                colorScheme="red"
                size={"xs"}
                onClick={() => {
                  setRegalo(item)
                  setOnUpdate(true)
                  onOpen()
                }}
              >
                E
              </Button>
              <Button
                colorScheme={"red"}
                size={"xs"}
                onClick={() => deleteRegalo(item.id)}
              >
                x
              </Button>
            </HStack>
          </HStack>
        </ListItem>
      ))}
    </UnorderedList>
  )
}

export default ListRegalo
