import Head from 'next/head';
import dynamic from 'next/dynamic';

const AppBody = dynamic(
    () => import('./components/app-body').then((mod) => mod.AppBody),
    {
        ssr: false,
    }
);
export default function Home() {
    return (
        <>
            <Head>
                <title>3D stuff</title>
                <meta name="description" content="3D stuff" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <AppBody />
            </main>
        </>
    );
}
