import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"
export default extendTheme({
  styles: {
    global: {
      "html,body": {
        backgroundColor: "gray.100",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        w: "100%",
        minH: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        mb: 2,
        textAlign: "center",
        fontFamily: "Mountains of Christmas, cursive",
      },
    },
  },
})
