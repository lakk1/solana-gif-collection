import {
  Flex,
  Text,
  Box,
  Image,
  useColorModeValue,
  Tooltip,
  Stack,
  Button,
} from '@chakra-ui/react'
import { FiThumbsUp } from 'react-icons/fi'

interface itemInterface {
  userAddress: object
  votesCount: object
  gifLink: string
}

function NFTCard({ item, upVote }: { item: itemInterface; upVote: any }) {
  const handleUpVote = () => {
    upVote(item)
  }
  const address = item?.userAddress?.toString()
  const votes = item?.votesCount?.toString() || 0
  return (
    <Flex p={50} alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="xs"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Box w="300px" h="300px" overflow={'hidden'}>
          <Image width="100%" src={item.gifLink} alt={'NFT'} roundedTop="lg" />
        </Box>
        <Box p="6" h={20}>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Tooltip
              label={address}
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
              <Stack direction={'row'} spacing={4} align={'center'}>
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                  <Text fontWeight={600}>Owner</Text>
                  <Text color={'gray.500'} overflow="hidden">
                    {address.slice(0, 20)}...
                  </Text>
                </Stack>
              </Stack>
            </Tooltip>
            <Button
              leftIcon={<FiThumbsUp />}
              color="red"
              onClick={handleUpVote}
              variant="solid"
            >
              {votes}{' '}
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default NFTCard
