import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import RootLayout from 'components/Layout';
import { ReactElement } from 'react';
import NFTCard from 'components/NFTCard';
import useGIFHook from 'hooks/useGIF';

export default function Home() {
  const {  gifList=[] } = useGIFHook();
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
        }}
      >
        {gifList && gifList.map((item, index) => (
          <NFTCard item={item} key={index} />
        ))}
      </Box>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>;
