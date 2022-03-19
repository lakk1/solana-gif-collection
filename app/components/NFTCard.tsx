import {
  Flex,
  Text,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Stack,
  Button,
} from '@chakra-ui/react';
import { FiThumbsUp } from 'react-icons/fi';

 

function NFTCard({item}){
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="xs"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image src={item.gifLink} alt={'NFT'} roundedTop="lg" />
        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Tooltip
              label="djhfdjhfjdhfjhsjhdjhdfjhdfjhfdjhdjh"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
              <Stack direction={'row'}   spacing={4} align={'center'}>
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                  <Text fontWeight={600}>Owner</Text>
                  <Text color={'gray.500'}   overflow="hidden">{item?.userAddress?.toString().slice(0,20)}...</Text>
                </Stack>
              </Stack>
            </Tooltip>
             <Button leftIcon={<FiThumbsUp  />} color="red" variant="solid">{item?.votesCount?.toString()} </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default NFTCard;
