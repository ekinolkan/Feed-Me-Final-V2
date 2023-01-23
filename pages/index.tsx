import type { NextPage } from "next"
import Image from 'next/image'
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
// Existing imports
import NavBar from "../components/NavBar"
// Existing imports
import Disconnected from '../components/Disconnected'
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"

const Home: NextPage = () => {

  const {connected} = useWallet()

  return (
    <div className={styles.container}>
      <Box
        
        bgImage={connected ? "url(/after-wallet-connection.jpg)" : "url(/feed-me-home-background.jpg)"}
        //backgroundPosition="no-repeat center center fixed"
        backgroundSize="cover"
        //backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />
          <Spacer />
            <Center>
              { /* If connected, the second view, otherwise the first */ }
              {/*{!connected && <Disconnected />}*/}
              {connected ? <Connected /> : <Disconnected />}
            </Center>
          <Spacer />
        </Stack>
      </Box>
    </div>
  )
}

export default Home
