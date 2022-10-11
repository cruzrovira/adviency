import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"
const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Mountains of Christmas, cursive",
        textAlign: "center",
        mb: 2,
      },
    },
  },
  styles: {
    global: {
      "html,body": {
        minH: "100vh",
        w: "100%",
        backgroundColor: "gray.100",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "not-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
})

export default theme
