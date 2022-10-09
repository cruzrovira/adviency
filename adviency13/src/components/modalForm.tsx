import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react"
import React from "react"

import { regalo } from "../types/regalo"
type props = {
  isOpen: boolean
  onClose: () => void
  onupdate: boolean
  addRegalo: () => void
  updateRegalo: () => void
  regalo: regalo
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
}

const ModalForm: React.FC<props> = ({
  onupdate,
  addRegalo,
  updateRegalo,
  regalo,
  setRegalo,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <Input
              placeholder="Regalo"
              value={regalo.nombre}
              onChange={e => setRegalo({ ...regalo, nombre: e.target.value })}
            />
            <Input
              placeholder="http://imagen_regalo"
              value={regalo.image}
              onChange={e => setRegalo({ ...regalo, image: e.target.value })}
            />
            <NumberInput
              defaultValue={1}
              max={99}
              min={1}
              value={regalo.cantidad}
              w="100%"
              onChange={cantidadString =>
                setRegalo({ ...regalo, cantidad: Number(cantidadString) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Input
              placeholder="Destinatario"
              value={regalo.destinatario}
              onChange={e =>
                setRegalo({ ...regalo, destinatario: e.target.value })
              }
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={"red"}
            onClick={() => {
              onupdate ? updateRegalo() : addRegalo()
            }}
          >
            Enviar
          </Button>
          <Button colorScheme="red" ml={2} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalForm
