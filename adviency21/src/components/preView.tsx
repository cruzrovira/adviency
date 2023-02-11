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
import React from "react"

import { regalo } from "../types/regalo"

type props = {
  onClosePreView: () => void
  isOpenPreView: boolean
  regalos: regalo[]
}

const PreView: React.FC<props> = ({
  onClosePreView,
  isOpenPreView,
  regalos,
}) => {
  return (
    <Modal isOpen={isOpenPreView} onClose={onClosePreView}>
      <ModalOverlay />
      <ModalContent className="print-modal" w="300px">
        <ModalCloseButton className="print" />
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Heading>Lista de regalos</Heading>
          <VStack w="100%">
            {regalos.map(item => (
              <HStack key={item.id} w="100%">
                <Image
                  alt={item.nombre}
                  fallbackSrc="https://via.placeholder.com/60"
                  src={item.image}
                />
                <VStack alignItems="flex-start" spacing={-1}>
                  <Text fontWeight={"bold"}>
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
            className="print"
            colorScheme={"red"}
            onClick={() => {
              window.print()
            }}
          >
            Imprimir
          </Button>
          <Button
            className="print"
            colorScheme={"red"}
            marginLeft={2}
            onClick={() => onClosePreView()}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PreView
