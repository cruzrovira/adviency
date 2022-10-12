import React from "react"
import {
  UnorderedList,
  ListItem,
  Image,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react"

import { regalo } from "../types/regalo"
type props = {
  regalos: regalo[] | undefined
  deleteRegalo: (id: string) => void
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  onOpen: () => void
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}
const ListRegalos: React.FC<props> = ({
  deleteRegalo,
  onOpen,
  regalos,
  setIsUpdate,
  setRegalo,
}) => {
  return (
    <UnorderedList listStyleType={"none"} mb={2} spacing={2}>
      {regalos?.map(item => (
        <ListItem key={item.id}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Image
                fallbackSrc="https://via.placeholder.com/60"
                h={"60px"}
                src={item.image}
                w="60px"
              />
              <VStack alignItems={"flex-start"}>
                <Text fontWeight={"bold"}>{item.nombre}</Text>
                <Text lineHeight={0.5}>{item.destinatario}</Text>
              </VStack>
              <Text>x{item.cantidad}</Text>
            </HStack>
            <HStack>
              <Button
                colorScheme={"red"}
                size="xs"
                onClick={() => {
                  setIsUpdate(true)
                  setRegalo(item)
                  onOpen()
                }}
              >
                E
              </Button>
              <Button
                colorScheme={"red"}
                size="xs"
                onClick={() => {
                  deleteRegalo(item.id)
                }}
              >
                X
              </Button>
            </HStack>
          </HStack>
        </ListItem>
      ))}
    </UnorderedList>
  )
}

export default ListRegalos
