import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"
const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Mountains of Christmas, cursive",
        mb: 2,
        textAlign: "center",
      },
    },
  },
  styles: {
    global: {
      "html,body": {
        minH: "100vh",
        w: "100%",
        backgroundColor: "gray.100",
        backgroundImage: `${bg}`,
        backgroundReat: "no-reat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
})

export default theme
