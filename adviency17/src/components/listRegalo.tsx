import React from "react"
import {
  UnorderedList,
  ListItem,
  HStack,
  Button,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react"

import { regalo } from "../types/regalo"
type props = {
  regalos: regalo[] | undefined
  setRegalo: React.Dispatch<React.SetStateAction<regalo | undefined>>
  onOpen: () => void
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  deleteRegalos: (id: string) => void
}
const ListRegalo: React.FC<props> = ({
  regalos,
  onOpen,
  setIsUpdate,
  setRegalo,
  deleteRegalos,
}) => {
  return (
    <UnorderedList listStyleType={"none"} mb={2}>
      {regalos?.map(item => (
        <ListItem key={item.id}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Image
                fallbackSrc={"https://via.placeholder.com/60"}
                h={"60px"}
                src={item.image}
                w="60px"
              />
              <VStack alignItems={"flex-start"} spacing={-1}>
                <Text>
                  {item.nombre} ({item.cantidad}) - ${item.precio}
                </Text>
                <Text color={"gray.500"}>{item.destinatario}</Text>
              </VStack>
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
                  deleteRegalos(item.id)
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

export default ListRegalo
