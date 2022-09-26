import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Mountains of Christmas, cursive",
      },
    },
  },
  styles: {
    global: {
      "html,body": {
        minH: "100vh",
        w: "100%",
        backgroundColor: "gray.100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
    },
  },
})

export default theme
