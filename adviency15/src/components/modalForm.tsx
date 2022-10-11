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
  isUpdate: boolean
  regalo: regalo
  onClose: () => void
  addRegalo: () => void
  updateRegalo: () => void
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
}

const ModalForm: React.FC<props> = ({
  isOpen,
  onClose,
  regalo,
  setRegalo,
  isUpdate,
  addRegalo,
  updateRegalo,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <Input
              placeholder="regalo"
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
              w={"100%"}
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
              isUpdate ? updateRegalo() : addRegalo()
            }}
          >
            Enviar
          </Button>
          <Button colorScheme={"red"} ml={2} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalForm
