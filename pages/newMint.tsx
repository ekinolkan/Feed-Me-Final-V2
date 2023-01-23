import type { NextPage } from "next"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import styles from "../styles/Home.module.css"
import NavBar from "../components/NavBar"
import {
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react"
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Center, Square, Circle } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { PublicKey } from "@solana/web3.js"
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { useRouter } from "next/router"

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
  const [metadata, setMetadata] = useState<any>()
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const {connected} = useWallet()
  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
    metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(mint) })
      .then((nft) => {
        fetch(nft.uri)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata)
          })
      })
  }, [mint, metaplex, walletAdapter])

  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      router.push(`/stake?mint=${mint}&imageSrc=${metadata?.image}`)
    },
    [router, mint, metadata]
  )

  return (
    <div className={styles.container}>
    <Box
    bgImage="url(/after-mint.jpg)"
    backgroundSize="cover"
    >
    <NavBar />
      <VStack spacing={15}>
        <Container>
          <VStack spacing={5}>
            <Heading color="white" as="h1" size="2xl" textAlign="center">
              <Center>
              <Image
              boxSize='130px'
              objectFit='cover'
              src="/cute-dog.png"
              />
              </Center>
            </Heading>
            <Text color="bodyText" fontSize="xl" textAlign="center">
            A new Feed Me NFT has appeared!
            </Text>
            <Text color="bodyText" fontSize="xl" textAlign="center">
              Congratulations, welcome to our Feed Me Club! <br />
              Time to save the cute dogs and feed them!<br />
              You can also stake your Feed Me NFTs to earn rewards and exclusive benefits.
            </Text>
          </VStack>
        </Container>
        <VStack spacing={8}>
        <Text color="bodyText" fontSize="xl" textAlign="center">
        Thank you for helping me! HAV HAV HAV!
        </Text>
        </VStack>
        <Image src={metadata?.image ?? ""} alt="" boxSize='300px'/>
        <Button
        
          bgColor="accent"
          color="white"
          maxW="380px"
          onClick={handleClick}
        >
          <HStack>
            <Text>Time to Stake your Feed Me NFT</Text>
            <ArrowForwardIcon />
          </HStack>
          
        </Button>
      </VStack>
      </Box>
      </div>
  )
}

interface NewMintProps {
  mint: PublicKey
}

NewMint.getInitialProps = async ({ query }) => {
  const { mint } = query

  if (!mint) throw { error: "no mint" }

  try {
    const mintPubkey = new PublicKey(mint)
    return { mint: mintPubkey }
  } catch {
    throw { error: "invalid mint" }
  }
}

export default NewMint