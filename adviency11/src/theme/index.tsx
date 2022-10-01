import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"
const theme = extendTheme({
  styles: {
    global: {
      "html,body": {
        minH: "100vh",
        w: "100%",
        backgroundColor: "gray.100",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Mountains of Christmas, cursive",
        mb: 2,
        textAlign: "center",
      },
    },
  },
})

export default theme
