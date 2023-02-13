import { chakra } from "@chakra-ui/react"
const SoundMute = (props: any) => (
  <svg
    className="icon glyph"
    height={64}
    viewBox="0 0 24 24"
    width={64}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.38 4.08a1 1 0 0 0-1.09.21L6.59 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.59l3.7 3.71A1 1 0 0 0 11 20a.84.84 0 0 0 .38-.08A1 1 0 0 0 12 19V5a1 1 0 0 0-.62-.92ZM16 15.5a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l5-5a1 1 0 0 1 1.42 1.42l-5 5a1 1 0 0 1-.71.29Z"
      style={{
        fill: "#c53030",
      }}
    />
    <path
      d="M21 15.5a1 1 0 0 1-.71-.29l-5-5a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 0 1.42 1 1 0 0 1-.71.29Z"
      style={{
        fill: "#c53030",
      }}
    />
  </svg>
)

export default chakra(SoundMute)
