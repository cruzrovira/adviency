import React from "react"
import {
  Button,
  Divider,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"

import { regalo } from "../types/regalo"

import Preview from "./preview"

type props = {
  regalos: regalo[]
  clearRegalos: () => void
  deleteRegaloId: (id: String) => void
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  onOpenModalForm: () => void
  setRegaloState: React.Dispatch<React.SetStateAction<string>>
}

const ListRegalos: React.FC<props> = ({
  regalos,
  clearRegalos,
  deleteRegaloId,
  setRegalo,
  onOpenModalForm,
  setRegaloState,
}) => {
  const {
    isOpen: isOpenPreview,
    onOpen: onOpenPreview,
    onClose: onClosePreview,
  } = useDisclosure()

  if (regalos.length === 0) {
    return (
      <Text color={"gray.500"}>Santa aun esta construyendo tu regalo .</Text>
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
              w={"60px"}
            />
            <VStack alignItems={"flex-start"} spacing={-1}>
              <Text>
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
              title={"Editar"}
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
              title={"Duplicar"}
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
              title={"Eliminar"}
              onClick={() => deleteRegaloId(item.id)}
            >
              X
            </Button>
          </HStack>
        </HStack>
      ))}
      <Divider borderColor="blackAlpha.700" />
      <Text fontWeight={"bold"}>
        <Text as="span" marginRight={"5px"}>
          Total:
        </Text>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(regalos.reduce((cc, item) => item.precio + cc, 0))}
      </Text>
      <Button
        colorScheme={"red"}
        title="Borrar todo"
        w="100%"
        onClick={() => clearRegalos()}
      >
        Borrar todo
      </Button>
      <Button
        colorScheme={"red"}
        title="Previsualizar"
        w="100%"
        onClick={() => {
          onOpenPreview()
        }}
      >
        Previsualizar
      </Button>
      <Preview
        isOpen={isOpenPreview}
        regalos={regalos}
        onClose={onClosePreview}
      />
    </VStack>
  )
}

export default ListRegalos
