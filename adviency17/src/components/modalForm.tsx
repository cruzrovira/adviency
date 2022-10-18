import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react"
import React from "react"

import datos from "../datos/regalosRandom.json"
import { getRandomIntInclusive } from "../lib/random"
import { regalo } from "../types/regalo"
type props = {
  addRegalos: () => void
  isOpen: boolean
  isUpdate: boolean
  onClose: () => void
  regalo: regalo | undefined
  setRegalo: React.Dispatch<React.SetStateAction<regalo | undefined>>
  updateRegalos: () => void
}
const ModalForm: React.FC<props> = ({
  addRegalos,
  isOpen,
  onClose,
  regalo,
  setRegalo,
  updateRegalos,
  isUpdate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel color={"gray.500"}>Regalo</FormLabel>
              <HStack>
                <Input
                  value={regalo?.nombre}
                  onChange={e => {
                    regalo && setRegalo({ ...regalo, nombre: e.target.value })
                  }}
                />
                <Button
                  w="50%"
                  onClick={() => {
                    regalo &&
                      setRegalo({
                        ...regalo,
                        nombre: datos[getRandomIntInclusive(0, 5)],
                      })
                  }}
                >
                  Sorprendeme!
                </Button>
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel color={"gray.500"}>Imagen</FormLabel>
              <Input
                placeholder={"http://imagen_regalo"}
                value={regalo?.image}
                onChange={e => {
                  regalo && setRegalo({ ...regalo, image: e.target.value })
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={"gray.500"}>Cantidad</FormLabel>
              <NumberInput
                min={1}
                value={regalo?.cantidad}
                w="100%"
                onChange={cantidadString => {
                  regalo &&
                    setRegalo({ ...regalo, cantidad: Number(cantidadString) })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel color={"gray.500"}>Precio</FormLabel>
              <NumberInput
                defaultValue={1}
                min={1}
                value={regalo?.precio}
                w="100%"
                onChange={precioString => {
                  regalo &&
                    setRegalo({ ...regalo, precio: Number(precioString) })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel color={"gray.500"}>Destinatario</FormLabel>
              <Input
                value={regalo?.destinatario}
                onChange={e => {
                  regalo &&
                    setRegalo({ ...regalo, destinatario: e.target.value })
                }}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={"red"}
            onClick={() => {
              isUpdate ? updateRegalos() : addRegalos()
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
