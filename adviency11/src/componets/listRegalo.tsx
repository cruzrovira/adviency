import {
  Button,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import React from "react"

import { typeRegalo } from "../type/regalos"

type typePros = {
  regalos: typeRegalo[]
  deleteRegalo: (id: string) => void
}
const ListRegalo: React.FC<typePros> = ({ regalos, deleteRegalo }) => {
  return (
    <UnorderedList listStyleType="none" spacing={2}>
      {regalos.map(item => (
        <ListItem key={item.id}>
          <HStack justifyContent="space-between">
            <HStack>
              <Image
                fallbackSrc="https://via.placeholder.com/60"
                h="60px"
                src={item.image}
                w="60px"
              />
              <Text>{item.nombre}</Text>
              <Text as="span">x{item.cantidad}</Text>
            </HStack>
            <Button
              colorScheme="red"
              size="xs"
              onClick={() => deleteRegalo(item.id)}
            >
              x
            </Button>
          </HStack>
        </ListItem>
      ))}
    </UnorderedList>
  )
}

export default ListRegalo
