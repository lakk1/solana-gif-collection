import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ThemeSwitch from "../ThemeSwitch";
import ConnectWallet from "../ConnectWallet";
import Logo from "../Logo";

 
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box p={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Logo />
          <Box sx={{fontSize:26,fontWeight:'600'}}>Solana GIF Collection</Box>
          <Flex alignItems={"center"}>
            <ConnectWallet />
            <ThemeSwitch />
          </Flex>
        </Flex>
       
      </Box>
    </>
  );
}
