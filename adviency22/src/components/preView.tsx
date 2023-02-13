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
  isOpenPreView: boolean
  regalos: regalo[]
  onClosePreView: () => void
}
const PreView: React.FC<props> = ({
  isOpenPreView,
  onClosePreView,
  regalos,
}) => {
  return (
    <Modal isOpen={isOpenPreView} onClose={onClosePreView}>
      <ModalOverlay />
      <ModalContent className="print-modal">
        <ModalCloseButton className="print" />
        <ModalHeader />
        <ModalBody>
          <Heading>Imprimir:</Heading>
          <VStack spacing={2} w="100%">
            {regalos.map(item => (
              <HStack key={item.id} justifyContent={"space-between"} w="100%">
                <HStack>
                  <Image
                    alt={item.nombre}
                    fallbackSrc={"https://via.placeholder.com/60"}
                    h={"60px"}
                    src={item.image}
                    w={"60px"}
                  />
                  <VStack alignItems="flex-start" spacing={-1}>
                    <Text>
                      {item.nombre} ({item.cantidad}) -{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.precio)}
                    </Text>
                    <Text>{item.destinatario}</Text>
                  </VStack>
                </HStack>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter className="print">
          <Button
            colorScheme={"red"}
            onClick={() => {
              window.print()
            }}
          >
            Imprimer
          </Button>
          <Button
            colorScheme={"red"}
            marginLeft={2}
            onClick={() => {
              onClosePreView()
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PreView
