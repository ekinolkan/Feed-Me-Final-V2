import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Metaplex,
  walletAdapterIdentity,
  CandyMachineV2,
} from "@metaplex-foundation/js"
import { useRouter } from "next/router"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const Connected: FC = () => {
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
  const [isMinting, setIsMinting] = useState(false)

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])

  useEffect(() => {
    if (!metaplex) return;

    metaplex
      .candyMachinesV2()
      .findByAddress({
        address: new PublicKey("CU6YabJvWj1aLrzp32xXQDnne5GxxYDQdiE6753DjRkJ"),
      })
      .then((candyMachine) => {
        console.log(candyMachine)
        setCandyMachine(candyMachine)
      })
      .catch((error) => {
        alert(error)
      })
  }, [metaplex])

  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return

      if (!walletAdapter.connected || !candyMachine) {
        return
      }

      try {
        setIsMinting(true);
              const nft = await metaplex
                  .candyMachinesV2()
                  .mint({ candyMachine });

        console.log(nft);
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
      } catch (error) {
        alert(error)
      } finally {
        setIsMinting(false)
      }
    },
    [metaplex, walletAdapter, candyMachine]
  )

  return (
    <VStack spacing={20}>
      <Button bgColor="accent"
       color="white" 
       maxW="380px"
       onClick={handleClick}
      isLoading={isMinting}
      >
        <HStack>
          <Text>Mint Feed Me</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
    </VStack>
  )
}

export default Connected