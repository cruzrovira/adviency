import React from "react"
import * as yup from "yup"
import { v4 as uuid } from "uuid"
import { useFormik } from "formik"
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

import { regalo } from "../types/regalo"
import regalosRandom from "../datos/regalosRandom.json"
import { getRandomIntInclusive } from "../lib/random"

type props = {
  isOpen: boolean
  addRegalo: (newRegalo: regalo) => void
  onClose: () => void
  updateRegalo: (updateItemRegalo: regalo) => void
  regalo: regalo
  regalos: regalo[]
  regaloState: string
}
const ModalForm: React.FC<props> = ({
  isOpen,
  onClose,
  addRegalo,
  updateRegalo,
  regalo,
  regaloState,
  regalos,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...regalo },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .trim()
        .required("El nombre es requerido")
        .test("nombre-repetido", (value, ctx) => {
          if (
            value &&
            regaloState === "add" &&
            regalos
              .map(item => item.nombre.toLowerCase())
              .includes(value.toLowerCase())
          ) {
            return ctx.createError({
              message: `El regalo "${value}" ya esta en su lista de regalos`,
            })
          }

          if (
            value &&
            regaloState === "update" &&
            regalos
              .map(item => item.nombre.toLowerCase())
              .filter(item => item !== regalo.nombre.toLowerCase())
              .includes(value.toLowerCase())
          ) {
            return ctx.createError({
              message: `El regalo "${value}" ya esta en su lista de regalos`,
            })
          }

          return true
        }),
      imagen: yup.string(),

      cantidad: yup
        .number()
        .min(1, "El minimo requerido es de 1")
        .max(99, "El maximo requerido es de 99")
        .required("La cantidad es requerida"),

      precio: yup
        .number()
        .min(1, "El minimo requerido es de 1")
        .max(99, "El maximo requerido es de 99")
        .required("El precio es requerido"),
      destinatario: yup
        .string()
        .trim()
        .required("El destinatario es requerido"),
    }),
    onSubmit: values => {
      if (regaloState === "add" || regaloState === "double") {
        addRegalo({
          id: uuid(),
          cantidad: values.cantidad,
          destinatario: values.destinatario,
          image: values.image,
          nombre: values.nombre,
          precio: values.precio,
        })
      }

      if (regaloState === "update") {
        updateRegalo({
          id: regalo.id,
          cantidad: values.cantidad,
          destinatario: values.destinatario,
          image: values.image,
          nombre: values.nombre,
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
      <form onSubmit={formik.handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl
                isInvalid={formik.touched.nombre && !!formik.errors.nombre}
              >
                <FormLabel>Regalo</FormLabel>
                <HStack spacing={2}>
                  <Input
                    placeholder="chocolate"
                    w="70%"
                    {...formik.getFieldProps("nombre")}
                  />
                  <Button
                    colorScheme={"red"}
                    w={"30%"}
                    onClick={() => {
                      formik.setFieldValue(
                        "nombre",
                        regalosRandom[getRandomIntInclusive(0, 5)]
                      )
                    }}
                  >
                    Sorprendeme!
                  </Button>
                </HStack>
                <FormErrorMessage>{formik.errors.nombre}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Imagen</FormLabel>
                <Input
                  placeholder="http://imagen.png"
                  {...formik.getFieldProps("image")}
                />
              </FormControl>
              <FormControl
                isInvalid={formik.touched.cantidad && !!formik.errors.cantidad}
              >
                <FormLabel>Cantidad</FormLabel>
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
                <FormErrorMessage>{formik.errors.cantidad}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.touched.precio && !!formik.errors.precio}
              >
                <FormLabel>Precio</FormLabel>
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
                <FormErrorMessage>{formik.errors.precio}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.destinatario && !!formik.errors.destinatario
                }
              >
                <FormLabel>Destinatario</FormLabel>
                <Input
                  placeholder="Oscar Alfredo Cruz"
                  {...formik.getFieldProps("destinatario")}
                />
                <FormErrorMessage>
                  {formik.errors.destinatario}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} type="submit">
              Guardar
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
