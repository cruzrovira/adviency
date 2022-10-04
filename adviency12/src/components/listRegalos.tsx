import {
  Button,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import React from "react"

import { typeRegalo } from "../type/typeRegalo"
type props = {
  regalos: typeRegalo[]
  deleteRegalo: (id: string) => void
}
const ListRegalos: React.FC<props> = ({ regalos, deleteRegalo }) => {
  return (
    <UnorderedList listStyleType="none" mb={2} spacing={2}>
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
              <VStack alignItems="flex-start" spacing={0}>
                <Text fontWeight={"bold"}>{item.nombre}</Text>
                <Text fontSize="small">{item.destinatario}</Text>
              </VStack>
            </HStack>
            <Button
              colorScheme={"red"}
              size={"xs"}
              onClick={() => {
                deleteRegalo(item.id)
              }}
            >
              x
            </Button>
          </HStack>
        </ListItem>
      ))}
    </UnorderedList>
  )
}

export default ListRegalos
