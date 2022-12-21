import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import { useFormik } from "formik"
import React from "react"
import * as yup from "yup"
import { v4 as uuid } from "uuid"

import regalosRandom from "../datos/regalosRandom.json"
import { getRandomIntInclusive } from "../lib/random"
import { regalo } from "../types/regalo"
type props = {
  isOpen: boolean
  isUpdate: boolean
  onClose: () => void
  regalo: regalo
  regalos: regalo[]
  setRegalo: React.Dispatch<React.SetStateAction<regalo>>
  addRegalo: (newRegalo: regalo) => void
  updateRegalo: (newUpdateRegalo: regalo) => void
}
const ModalForm: React.FC<props> = ({
  isOpen,
  isUpdate,
  onClose,
  regalo,
  regalos,
  setRegalo,
  addRegalo,
  updateRegalo,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: yup.object({
      nombre: yup
        .string()
        .trim()
        .required("El nombre es requerido")
        .test("nombre-incorrecto", (value, ctx) => {
          if (
            value &&
            !isUpdate &&
            regalos
              .map(item => item.nombre.toLowerCase())
              .includes(value.toLowerCase())
          ) {
            return ctx.createError({
              message: "El regalo ya esta agregado",
            })
          }

          if (
            value &&
            isUpdate &&
            regalos
              .map(item => item.nombre.toLowerCase())
              .filter(item => item !== regalo?.nombre.toLowerCase())
              .includes(value.toLowerCase())
          ) {
            return ctx.createError({
              message: "El regalo ya esta agregado",
            })
          }

          return true
        }),
      image: yup.string(),
      cantidad: yup
        .number()
        .min(1, "El minimo requerido es de 1")
        .max(99, "El maximo requerido es de 99")
        .required("la cantidad es requerida"),
      precio: yup
        .number()
        .min(1, "El minimo requerido es de 1")
        .max(99, "El maximo requerido es de 99")
        .required("El precio es requerido"),
      destinatario: yup.string().required("El destinatario es requerido"),
    }),

    initialValues: { ...regalo },
    onSubmit: values => {
      if (isUpdate) {
        updateRegalo({
          id: regalo.id,
          nombre: values.nombre,
          cantidad: values.cantidad,
          destinatario: values.destinatario,
          image: values.image,
          precio: values.precio,
        })
      } else {
        addRegalo({
          id: uuid(),
          nombre: values.nombre,
          cantidad: values.cantidad,
          destinatario: values.destinatario,
          image: values.image,
          precio: values.precio,
        })
      }
      onClose()
      formik.resetForm()
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        formik.resetForm()
      }}
    >
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl
                isInvalid={formik.touched.nombre && !!formik.errors.nombre}
              >
                <FormLabel color={"gray.500"}>Regalo:</FormLabel>
                <HStack>
                  <Input {...formik.getFieldProps("nombre")} w="60%" />
                  <Button
                    w="40%"
                    onClick={() => {
                      formik.setFieldValue(
                        "nombre",
                        regalosRandom[getRandomIntInclusive(0, 5)]
                      )
                    }}
                  >
                    Sorpendeme!
                  </Button>
                </HStack>

                {formik.touched.nombre && (
                  <FormErrorMessage>{formik.errors.nombre}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel color={"gray.500"}>Image:</FormLabel>
                <Input {...formik.getFieldProps("image")} />
                {formik.touched.image && (
                  <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!formik.errors.cantidad}>
                <FormLabel color={"gray.500"}>Cantidad:</FormLabel>
                <NumberInput
                  defaultValue={1}
                  max={99}
                  min={1}
                  {...formik.getFieldProps("cantidad")}
                  onChange={valueString => {
                    formik.setFieldValue("cantidad", Number(valueString))
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                {formik.touched.cantidad && (
                  <FormErrorMessage>{formik.errors.cantidad}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!formik.errors.precio}>
                <FormLabel color={"gray.500"}>precio:</FormLabel>
                <NumberInput
                  defaultValue={1}
                  max={99}
                  min={1}
                  {...formik.getFieldProps("precio")}
                  onChange={valueString => {
                    formik.setFieldValue("precio", Number(valueString))
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {formik.touched.precio && (
                  <FormErrorMessage>{formik.errors.precio}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.destinatario && !!formik.errors.destinatario
                }
              >
                <FormLabel color={"gray.500"}>Destinatario:</FormLabel>
                <Input {...formik.getFieldProps("destinatario")} />
                {formik.touched.destinatario && (
                  <FormErrorMessage>
                    {formik.errors.destinatario}
                  </FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} type="submit">
              Enviar
            </Button>
            <Button
              colorScheme={"red"}
              ml={2}
              onClick={() => {
                onClose()
                formik.resetForm()
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
