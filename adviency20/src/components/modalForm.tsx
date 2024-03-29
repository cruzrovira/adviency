import React from "react"
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
  VStack,
} from "@chakra-ui/react"
import * as yup from "yup"
import { v4 as uuid } from "uuid"
import { useFormik } from "formik"

import { getRandomIntInclusive } from "../lib/random"
import regalosRandom from "../datos/regalosRandom.json"
import { regalo } from "../types/regalo"
type props = {
  isOpen: boolean
  onClose: () => void
  regaloState: string
  updateRegalos: (updateRegaloItem: regalo) => void
  addRegalo: (newRegalo: regalo) => void
  regalo: regalo
  regalos: regalo[]
}

const ModalForm: React.FC<props> = ({
  isOpen,
  onClose,
  addRegalo,
  regalo,
  regaloState,
  updateRegalos,
  regalos,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...regalo },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .trim()
        .required("El regalo es requerido")
        .test("validation-name", (value, ctx) => {
          if (
            value &&
            regaloState === "add" &&
            regalos
              .map(item => item.nombre.toLowerCase())
              .includes(value.toLowerCase())
          ) {
            return ctx.createError({
              message: `El regalo ${value} ya esta en su lista de regalos`,
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
      image: yup.string().url(),
      cantidad: yup
        .number()
        .required("La cantidad es requerida")
        .integer("La cantidad debe ser entera"),
      precio: yup.number().required("El precio es requerido"),
      destinatario: yup
        .string()
        .trim()
        .required("El destinatario es requerido"),
    }),
    onSubmit: values => {
      if (regaloState === "add" || regaloState === "double") {
        addRegalo({
          id: uuid(),
          nombre: values.nombre,
          cantidad: values.cantidad,
          precio: values.precio,
          image: values.image,
          destinatario: values.destinatario,
        })
      }

      if (regaloState === "update") {
        updateRegalos({
          id: values.id,
          nombre: values.nombre,
          cantidad: values.cantidad,
          precio: values.precio,
          image: values.image,
          destinatario: values.destinatario,
        })
      }
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        formik.resetForm()
        onClose()
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader></ModalHeader>
          <ModalBody>
            <VStack spacing={2}>
              <FormControl
                isInvalid={formik.touched.nombre && !!formik.errors.nombre}
              >
                <FormLabel>Regalo</FormLabel>
                <HStack w="100%">
                  <Input
                    placeholder="chocolate"
                    type={"text"}
                    w="60%"
                    {...formik.getFieldProps("nombre")}
                  />
                  <Button
                    w="40%"
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
              <FormControl
                isInvalid={formik.touched.image && !!formik.errors.image}
              >
                <FormLabel>Imagen</FormLabel>
                <Input
                  placeholder="http://imagen.png"
                  type={"url"}
                  {...formik.getFieldProps("image")}
                />
                <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.cantidad && !!formik.errors.cantidad}
              >
                <FormLabel>Cantidad</FormLabel>
                <Input
                  placeholder="1"
                  type={"number"}
                  {...formik.getFieldProps("cantidad")}
                />
                <FormErrorMessage>{formik.errors.cantidad}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.precio && !!formik.errors.precio}
              >
                <FormLabel>Precio</FormLabel>
                <Input
                  placeholder="99"
                  type={"number"}
                  {...formik.getFieldProps("precio")}
                />
                <FormErrorMessage>{formik.errors.precio}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.destinatario && !!formik.errors.destinatario
                }
              >
                <FormLabel>Destinatario</FormLabel>
                <Input
                  placeholder="Oscar Cruz"
                  type={"text"}
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
              Aceptar
            </Button>
            <Button
              colorScheme={"red"}
              marginLeft={2}
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
