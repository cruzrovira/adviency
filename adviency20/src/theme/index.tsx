import { extendTheme } from "@chakra-ui/react"

import bg from "../assets/bg.webp"
export default extendTheme({
  styles: {
    global: {
      "html,body": {
        w: "100%",
        minH: "100vh",
        backgroundColor: "gray.100",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
