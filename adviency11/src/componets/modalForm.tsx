import React, { useState } from "react"
import {
  Button,
  Input,
  Modal,
  ModalBody,
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
import { v4 as uuid } from "uuid"

import { typeRegalo } from "../type/regalos"

type typeProps = {
  isOpen: boolean
  onClose: () => void
  addRegalo: (regalo: typeRegalo) => void
  regalos: typeRegalo[]
}

const ModalForm: React.FC<typeProps> = ({
  isOpen,
  onClose,
  addRegalo,
  regalos,
}) => {
  const [regalo, setRegalo] = useState<typeRegalo>({
    id: "",
    cantidad: 1,
    nombre: "",
    image: "",
  })
  const add = () => {
    if (validateError()) {
      return
    }
    addRegalo({ ...regalo, id: uuid() })
    setRegalo({ id: "", cantidad: 1, nombre: "", image: "" })
    onClose()
  }
  const validateError = (): boolean => {
    if (regalo.nombre.trim().toLowerCase.length === 0) {
      setRegalo({ id: "", cantidad: 1, nombre: "", image: "" })
      return true
    }
    const regaloEncontrado = regalos.find(item => item.nombre === regalo.nombre)

    if (regaloEncontrado) {
      setRegalo({ id: "", cantidad: 1, nombre: "", image: "" })
      return true
    }

    return false
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ModalHeader></ModalHeader>
          <VStack spacing={2}>
            <Input
              placeholder="regalos"
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
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={add}>
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
