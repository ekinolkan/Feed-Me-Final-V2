import {
  Heading,
  VStack,
  Text,
  HStack,
  Flex,
  Image,
  Center,
  Box,
} from "@chakra-ui/react"
import { PublicKey } from "@solana/web3.js"
import { NextPage } from "next"
import { useState } from "react"
// Existing imports
import NavBar from "../components/NavBar"
import styles from "../styles/Home.module.css"
import { StakeOptionsDisplay } from "../components/StakeOptionsDisplay"

const Stake: NextPage<StakeProps> = ({ mint, imageSrc }) => {
  const [isStaking, setIsStaking] = useState(false)
  
    return (
        <div className={styles.container}>
        <Box 
        bgImage="url(/stake.png)"
        backgroundSize="cover"
        >
        <NavBar />
        <VStack spacing={7} justify="flex-start" align="flex-start">
          <Heading color="white" as="h1" size="2xl">
            Earn $FM, feed cute dogs and get exclusive benefits!
          </Heading>
          <Text color="bodyText" fontSize="xl" textAlign="start" maxWidth="600px">
            Stake your Feed Me NFTs to earn 1 $FM per day to get access to a
            exclusive benefits.
          </Text>
          <HStack spacing={20} alignItems="flex-start">
            <VStack align="flex-start" minWidth="200px">
              <Flex direction="column">
                <Image src={imageSrc ?? ""} alt="buildoor nft" zIndex="1" />
                <Center
                  bgColor="secondaryPurple"
                  borderRadius="0 0 8px 8px"
                  marginTop="-8px"
                  zIndex="2"
                  height="32px"
                >
                  <Text
                    color="white"
                    as="b"
                    fontSize="md"
                    width="100%"
                    textAlign="center"
                  >
                    {isStaking ? "STAKING" : "UNSTAKED"}
                  </Text>
                </Center>
              </Flex>
            </VStack>
            <VStack alignItems="flex-start" spacing={10}>
              <StakeOptionsDisplay
               isStaking={false}
               daysStaked={4}
               totalEarned={60}
               claimable={20}
              />
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </div>
    )
  }
  
  interface StakeProps {
    mint: PublicKey
    imageSrc: string
  }
  
  Stake.getInitialProps = async ({ query }: any) => {
    const { mint, imageSrc } = query
  
    if (!mint || !imageSrc) throw { error: "no mint" }
  
    try {
      const mintPubkey = new PublicKey(mint)
      return { mint: mintPubkey, imageSrc: imageSrc }
    } catch {
      throw { error: "invalid mint" }
    }
  }
  
  export default Stake