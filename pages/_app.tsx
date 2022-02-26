import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout, Seo, Navigation } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Seo />
            <Navigation />
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
