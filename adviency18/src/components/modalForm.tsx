import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
} from "@chakra-ui/react"
import { useFormik } from "formik"
import React from "react"
import * as yup from "yup"

import { regalo } from "../types/regalo"
type props = {
  isOpen: boolean
  isUpdate: boolean | undefined
  onClose: () => void
  regalo: regalo | undefined
  regalos: regalo[]
  setRegalo: React.Dispatch<React.SetStateAction<regalo | undefined>>
}
const ModalForm: React.FC<props> = ({
  isOpen,
  isUpdate,
  onClose,
  regalo,
  regalos,
  setRegalo,
}) => {
  const formik = useFormik({
    initialValues: {
      ...regalo,
    },
    validationSchema: yup.object({
      nombre: yup.string().required("El nombre es requerido"),
      destinatario: yup.string().required("El destinatario es requerido"),
      cantidad: yup.number().required("La cantidad es requerida"),
    }),
    onSubmit: values => {
      console.log("Entro")
    },
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalBody>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <FormControl isRequired isInvalid={!!formik.errors.nombre}>
              <FormLabel>Nombre</FormLabel>
              <Input type={"text"} {...formik.getFieldProps("nombre")} />
              <FormErrorMessage>{formik.errors.nombre}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Imagen</FormLabel>
              <Input type={"url"} {...formik.getFieldProps("image")} />
            </FormControl>
            <FormControl isRequired isInvalid={!!formik.errors.cantidad}>
              <FormLabel>Cantidad</FormLabel>
              <NumberInput
                defaultValue={1}
                max={99}
                min={1}
                value={formik.values.cantidad}
                onChange={cantidadString =>
                  formik.setFieldValue("cantidad", Number(cantidadString))
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{formik.errors.cantidad}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formik.errors.precio}>
              <FormLabel>Precio</FormLabel>
              <NumberInput
                defaultValue={1}
                min={1}
                onChange={precioString =>
                  formik.setFieldValue("precio", Number(precioString))
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{formik.errors.precio}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formik.errors.destinatario}>
              <FormLabel>Destinatario</FormLabel>
              <Input type={"text"} {...formik.getFieldProps("destinatario")} />
              <FormErrorMessage>{formik.errors.destinatario}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" type="submit">
              Enviar
            </Button>
            <Button
              colorScheme={"red"}
              ml={2}
              onClick={() => {
                formik.resetForm()
                onClose()
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default ModalForm
