import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react"
import React from "react"

import { regalo } from "../types/regalo"
import datos from "../datos/regalosRandom.json"
import { getRandomIntInclusive } from "../lib/random"

type props = {
  addRegalo: () => void
  isOpen: boolean
  isUpdate: boolean
  onClose: () => void
  regalo: regalo
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  updateRegalo: () => void
}

const ModelForm: React.FC<props> = ({
  addRegalo,
  isOpen,
  isUpdate,
  onClose,
  regalo,
  setRegalo,
  updateRegalo,
}) => {
  const ragaloRandom = () => {
    setRegalo({
      ...regalo,
      nombre: datos[getRandomIntInclusive(1, datos.length - 1)],
    })
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <HStack w="100%">
              <Input
                placeholder="Nombre"
                value={regalo.nombre}
                onChange={e => setRegalo({ ...regalo, nombre: e.target.value })}
              />
              <Button w={"50%"} onClick={ragaloRandom}>
                Sorprendeme!
              </Button>
            </HStack>
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

export default ModelForm
