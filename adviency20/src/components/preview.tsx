import React from "react"
import {
  Button,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"

import { regalo } from "../types/regalo"

type props = {
  isOpen: boolean
  onClose: () => void
  regalos: regalo[]
}

const Preview: React.FC<props> = ({ isOpen, onClose, regalos }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalCloseButton />
        <ModalHeader></ModalHeader>
        <ModalBody>
          <VStack spacing={2} w="100%">
            <Heading>Comprar:</Heading>
            {regalos.map(item => (
              <HStack key={item.id} w="100%">
                <Image
                  fallbackSrc="https://via.placeholder.com/60"
                  h={"60px"}
                  src={item.image}
                  w={"60px"}
                />
                <VStack alignItems={"flex-start"} spacing={-1}>
                  <Text>
                    {item.nombre} ({item.cantidad})
                  </Text>
                  <Text>{item.destinatario}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100%"
            onClick={() => {
              onClose()
            }}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Preview
