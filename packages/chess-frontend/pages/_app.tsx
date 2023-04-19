import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Layout from '../components/Layout';
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import { userContext } from '../Contexts/userContext';
const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  return (
    <>
      <userContext.Provider value={{ userId, setUserId, token, setToken }}>
        <Head>
          <title>Realtime-Chess</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <main className="app">
              <Component {...pageProps} />
            </main>
          </Layout>
        </QueryClientProvider>
      </userContext.Provider>
    </>
  );
}

export default CustomApp;
