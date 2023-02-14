import React, { useState, useRef } from "react"
import { chakra } from "@chakra-ui/react"

import soundIcon from "../icons/sound"
import soundMuteIcon from "../icons/soundMute"
import musica from "../assets/musica/Jingle_Bell_Rock.mp3"

type props = {}
const Sound: React.FC<props> = () => {
  const [touche, setTouche] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const SoundChakraIcon = chakra(soundIcon)
  const SoundMuteChakraIcon = chakra(soundMuteIcon)

  touche && audioRef.current?.play()
  !touche && audioRef.current?.pause()

  return (
    <>
      {touche ? (
        <SoundChakraIcon
          cursor={"pointer"}
          h="32px"
          w={"32px"}
          onClick={() => setTouche(!touche)}
        />
      ) : (
        <SoundMuteChakraIcon
          cursor={"pointer"}
          h="32px"
          w={"32px"}
          onClick={() => setTouche(!touche)}
        />
      )}
      <audio ref={audioRef} loop src={musica} />
    </>
  )
}

export default Sound
