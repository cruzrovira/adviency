import {
  UnorderedList,
  ListItem,
  Image,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react"
import React from "react"

import { regalo } from "../types/regalo"

type props = {
  deleteRegalo: (id: string) => void
  onOpen: () => void
  regalos: regalo[] | undefined
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const ListRegalo: React.FC<props> = ({
  deleteRegalo,
  onOpen,
  regalos = [],
  setRegalo,
  setIsUpdate,
}) => {
  return (
    <UnorderedList listStyleType="none" spacing={2}>
      {regalos.map(item => (
        <ListItem key={item.id}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Image
                fallbackSrc="https://via.placeholder.com/60"
                h="60px"
                src={item.image}
                w="60px"
              />

              <VStack alignItems={"flex-start"} spacing={0}>
                <Text fontWeight={"bold"}>{item.nombre}</Text>
                <Text lineHeight="8px">{item.destinatario}</Text>
              </VStack>
            </HStack>
            <HStack>
              <Button
                colorScheme={"red"}
                size="xs"
                onClick={() => {
                  setRegalo(item)
                  setIsUpdate(true)
                  onOpen()
                }}
              >
                E
              </Button>
              <Button
                colorScheme={"red"}
                size="xs"
                onClick={() => deleteRegalo(item.id)}
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

export default ListRegalo
