import {
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import useGIFHook from "hooks/useGIF";

const ConnectWallet = () => {
   const {walletAddress,createGifAccount,connectWallet} =  useGIFHook()
  const alletBoxBG = useColorModeValue("white", "gray.600");
  const addressBG = useColorModeValue("gray.400", "gray.800");
  console.log({walletAddress,createGifAccount})
  if (walletAddress) {
    return (
          <Box
            sx={{
              display: "inline-flex",
              mr: 4,
              bg: alletBoxBG,
              borderRadius: "md",
              px: { base: 0, md: 1 },
              py: { base: 0, md: 1 },
              alignItems: "center",
              fontWeight: "semibold",
            }}
          >
            <Box
              sx={{
                bg: addressBG,
                borderRadius: "md",
                py: 1,
                px: 4,
              }}
            >
              <Box display={{ base: "none", md: "inline" }}>{walletAddress}</Box>
            </Box>
          </Box>
    );
  }
  return (
    <Button variant={"solid"} colorScheme="newblue" mr={4} onClick={connectWallet} >
      <span>Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
