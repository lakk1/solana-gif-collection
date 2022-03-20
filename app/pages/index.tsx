import { Box, Button, Input, Flex, Grid } from '@chakra-ui/react'
import Head from 'next/head'
import RootLayout from 'components/Layout'
import { ReactElement } from 'react'
import NFTCard from 'components/NFTCard'
import useGIFHook from 'hooks/useGIF'

export default function Home() {
  const { gifList = [], upVote, sendGif } = useGIFHook()
  const handleSubmit = (e) => {
    e.preventDefault()
    const gifUrl = e.target.elements.gif.value || ''
    gifUrl && sendGif(gifUrl)
    e.form.reset()
  }
  return (
    <div>
      <Head>
        <title>lakiswap</title>
        <meta name="description" content="Decentralize exchange" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 8,
          height: '100%',
        }}
      >
        <Box width="100%">
          <form onSubmit={handleSubmit}>
            <Flex>
              <Input
                name="gif"
                sx={{
                  width: '100%',
                  borderColor: 'blue',
                  borderRadius: '10px 0 0 10px',
                }}
                size="lg"
                placeholder="Enter GIF URL"
              />
              <Button
                type="submit"
                sx={{ borderRadius: '0 10px 10px 0' }}
                size="lg"
                colorScheme={'blue'}
                variant={'solid'}
              >
                Submit GIF
              </Button>
            </Flex>
          </form>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {gifList &&
            gifList.map((item, index) => (
              <NFTCard item={item} upVote={upVote} key={index} />
            ))}
        </Grid>
      </Box>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>
