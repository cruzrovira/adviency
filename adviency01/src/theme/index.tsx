import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    Heading: "'Mountains of Christmas', cursive",
  },
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bg: "gray.100",
      },
    },
  },
})

export default theme
