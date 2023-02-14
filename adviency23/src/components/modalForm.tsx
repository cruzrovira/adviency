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
import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { v4 as uuid } from "uuid"

import regalosRandom from "../datos/regalosRandom.json"
import { getRandomIntInclusive } from "../lib/random"
import { regalo } from "../types/regalo"
type props = {
  addRegalos: (newRegalo: regalo) => void
  isOpenModalForm: boolean
  regalo: regalo
  regaloState: string
  regalos: regalo[]
  updateRegalos: (newUpdateRegalo: regalo) => void
  onCloseModalForm: () => void
}
const ModalForm: React.FC<props> = ({
  addRegalos,
  isOpenModalForm,
  regalo,
  regaloState,
  regalos,
  onCloseModalForm,
  updateRegalos,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...regalo },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .trim()
        .required("El campo es requerido")
        .test("validate-nombre", (value, ctx) => {
          if (
            value &&
            regaloState === "add" &&
            regalos
              .map(item => item.nombre.toLowerCase())
              .includes(value.toLowerCase())
          ) {
            return ctx.createError({
              message: "El regalo ya esta en su lista de regalos",
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
      image: yup.string().trim(),
      cantidad: yup
        .number()
        .required("El campo es requerido")
        .integer("El campo debe ser entero"),
      precio: yup.number().required("El campo es requerido"),
      destinatario: yup.string().trim().required("El campo es requerido"),
    }),
    onSubmit: values => {
      if (regaloState === "add" || regaloState === "douoble") {
        addRegalos({
          id: uuid(),
          nombre: values.nombre,
          image: values.image,
          cantidad: values.cantidad,
          precio: values.precio,
          destinatario: values.destinatario,
        })
      }
      if (regaloState === "update") {
        updateRegalos({
          id: values.id,
          nombre: values.nombre,
          image: values.image,
          cantidad: values.cantidad,
          precio: values.precio,
          destinatario: values.destinatario,
        })
      }

      formik.resetForm()
      onCloseModalForm()
    },
  })

  return (
    <Modal
      isOpen={isOpenModalForm}
      onClose={() => {
        formik.resetForm()
        onCloseModalForm()
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
                <HStack>
                  <Input
                    placeholder="Chocolate"
                    type={"text"}
                    w="60%"
                    {...formik.getFieldProps("nombre")}
                  />
                  <Button
                    w="40%"
                    onClick={() => {
                      formik.setFieldValue(
                        "nombre",
                        regalosRandom[
                          getRandomIntInclusive(0, regalosRandom.length)
                        ]
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
                  placeholder="http://iamgen.png"
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
                  placeholder="1.5"
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
                onCloseModalForm()
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
