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
import * as yup from "yup"
import { useFormik } from "formik"
import { v4 as uuid } from "uuid"

import { regalo } from "../types/regalo"
import regalosRandom from "../datos/regalosRandom.json"
import { getRandomIntInclusive } from "../lib/random"

type props = {
  addRegalo: (newRegalo: regalo) => void
  isOpenModalForm: boolean
  regalo: regalo
  regaloState: string
  regalos: regalo[]
  updateRegalo: (newUpdateRegalo: regalo) => void
  onCloseModalForm: () => void
}
const ModalForm: React.FC<props> = ({
  addRegalo,
  isOpenModalForm,
  onCloseModalForm,
  regalo,
  regaloState,
  regalos,
  updateRegalo,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...regalo },
    validationSchema: yup.object({
      nombre: yup
        .string()
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
              message: `El regalo ${value} ya esta en tu lista de regalos`,
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
      image: yup.string(),
      precio: yup.number().required("El campo es requerido"),
      cantidad: yup
        .number()
        .required("El campo es requerido")
        .integer("El valor debe ser de tipo entero"),
      destinatario: yup.string().trim().required("El campo es requerido"),
    }),
    onSubmit: values => {
      if (regaloState === "add") {
        addRegalo({
          id: uuid(),
          cantidad: values.cantidad,
          destinatario: values.destinatario,
          image: values.image,
          nombre: values.nombre,
          precio: values.precio,
        })
      }

      if (regaloState === "update" || regaloState === "double") {
        addRegalo({
          id: values.id,
          cantidad: values.cantidad,
          destinatario: values.destinatario,
          image: values.image,
          nombre: values.nombre,
          precio: values.precio,
        })
        formik.resetForm()
        onCloseModalForm()
      }
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
          <ModalHeader />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl
                isInvalid={formik.touched.nombre && !!formik.errors.nombre}
              >
                <FormLabel>Regalo</FormLabel>
                <HStack>
                  <Input
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
                  placeholder="1"
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
