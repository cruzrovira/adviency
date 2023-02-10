import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"
const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        mb: 2,
        textAlign: "center",
        fontFamily: "Mountains of Christmas, cursive",
      },
    },
  },
  styles: {
    global: {
      "html,body": {
        w: "100%",
        minH: "100vh",
        backgroundColor: "gray.100",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeate",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
})

export default theme
