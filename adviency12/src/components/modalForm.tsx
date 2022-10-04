import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  Input,
  Button,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { v4 as uuid } from "uuid"

import { typeRegalo } from "../type/typeRegalo"

type props = {
  isOpen: boolean
  regalos: typeRegalo[]
  onClose: () => void
  addRegalo: (regalo: typeRegalo) => void
}

const ModalForm: React.FC<props> = ({
  isOpen,
  onClose,
  addRegalo,
  regalos,
}) => {
  const [regalo, setRegalo] = useState<typeRegalo>({
    id: "",
    cantidad: 1,
    image: "",
    destinatario: "",
    nombre: "",
  })

  const add = (): void => {
    if (validateError()) {
      return
    }

    addRegalo({ ...regalo, id: uuid() })
    setRegalo({
      id: "",
      cantidad: 1,
      image: "",
      destinatario: "",
      nombre: "",
    })
    onClose()
  }

  const validateError = (): boolean => {
    if (regalo.nombre.trim().length === 0) {
      console.log("Entro")
      setRegalo({
        id: "",
        cantidad: 1,
        image: "",
        destinatario: "",
        nombre: "",
      })
      return true
    }

    if (regalo.destinatario.trim().length === 0) {
      setRegalo({
        id: "",
        cantidad: 1,
        image: "",
        destinatario: "",
        nombre: "",
      })
      return true
    }
    const regaloEncontrado = regalos.find(
      item => item.nombre.toLowerCase() === regalo.nombre.toLowerCase()
    )

    if (regaloEncontrado) {
      setRegalo({
        id: "",
        cantidad: 1,
        image: "",
        destinatario: "",
        nombre: "",
      })
      return true
    }
    return false
  }
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
              placeholder="http://iamgen_regalo"
              value={regalo.image}
              onChange={e => setRegalo({ ...regalo, image: e.target.value })}
            />
            <NumberInput
              value={regalo.cantidad}
              w="100%"
              onChange={cantidadString =>
                setRegalo({ ...regalo, cantidad: Number(cantidadString) })
              }
            >
              <NumberInputField defaultValue={1} max={99} min={1} />
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
          <Button colorScheme="red" onClick={add}>
            Enviar
          </Button>
          <Button colorScheme="red" ml={2} onClick={onClose}>
            Calcelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalForm
