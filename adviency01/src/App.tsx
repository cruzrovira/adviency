import { Heading, UnorderedList, ListItem } from "@chakra-ui/react"
function App() {
  return (
    <div>
      <Heading>Regalos</Heading>
      <UnorderedList listStyleType={"none"}>
        <ListItem>Medias</ListItem>
        <ListItem>Caramelos</ListItem>
        <ListItem>Vitel tone</ListItem>
      </UnorderedList>
    </div>
  )
}

export default App
