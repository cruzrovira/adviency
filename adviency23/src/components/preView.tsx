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
  isOpenPreview: boolean
  regalos: regalo[]
  onClosePreview: () => void
}
const PreView: React.FC<props> = ({
  isOpenPreview,
  onClosePreview,
  regalos,
}) => {
  return (
    <Modal isOpen={isOpenPreview} onClose={onClosePreview}>
      <ModalOverlay />
      <ModalContent className="print-modal">
        <ModalCloseButton className="print" />
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Heading>Imprimir</Heading>
          <VStack spacing={2} w="100%">
            {regalos.map(item => (
              <HStack key={item.id} w="100%">
                <Image
                  alt={item.nombre}
                  fallbackSrc={"https://via.placeholder.com/60"}
                  h={"60px"}
                  src={item.image}
                  w="60px"
                />
                <VStack alignItems="flex-start" spacing={-1}>
                  <Text>
                    {item.nombre} ({item.cantidad}) -{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.precio)}
                  </Text>
                  <Text color={"gray.500"}>{item.destinatario}</Text>
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
            onClick={() => onClosePreview()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PreView
