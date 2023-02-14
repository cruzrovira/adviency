import { chakra } from "@chakra-ui/react"
const Sound = (props: any) => (
  <svg
    className="icon glyph"
    height={64}
    viewBox="0 0 24 24"
    width={64}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.36 19.36a1 1 0 0 1-.7-.29 1 1 0 0 1 0-1.41 8 8 0 0 0 0-11.32 1 1 0 0 1 1.41-1.41 10 10 0 0 1 0 14.14 1 1 0 0 1-.71.29Z"
      style={{
        fill: "#c53030",
      }}
    />
    <path
      d="M15.54 16.54a1 1 0 0 1-.71-.3 1 1 0 0 1 0-1.41 4 4 0 0 0 0-5.66 1 1 0 0 1 1.41-1.41 6 6 0 0 1 0 8.48 1 1 0 0 1-.7.3ZM11.38 4.08a1 1 0 0 0-1.09.21L6.59 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.59l3.7 3.71A1 1 0 0 0 11 20a.84.84 0 0 0 .38-.08A1 1 0 0 0 12 19V5a1 1 0 0 0-.62-.92Z"
      style={{
        fill: "#c53030",
      }}
    />
  </svg>
)

export default chakra(Sound)
