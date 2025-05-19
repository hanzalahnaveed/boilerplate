import "./globals.css";
import { Montserrat } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css'
import Providers from "../redux/Providers/Providers";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import NavBar from "@/components/ClientComponents/Common/Navbar";
import Footer from "@/components/ClientComponents/Common/Footer";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    variable: '--font-montserrat',
    fallback: ['Arial', 'sans-serif'],
});

export const metadata = {
    title: "Global Travel Technology",
    description: "Platform for travel & hotel agents in urban areas to book flights, cruises, hotels, and more. Classic model with modern tech for 18-60-year-old travelers.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <Head>
            <link rel="icon" href="../app/favicon.ico"/>
            <meta charSet="utf-8"/>
        </Head>
        <body
            className={`${montserrat.variable} tw-antialiased`}
        >
        <Providers>
            <NextTopLoader
                color="#00FF55"
                initialPosition={0.08}
                crawlSpeed={200}
                height={10}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={100}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                zIndex={1600}
                showAtBottom={false}
            />
            <NavBar/>
            {children}
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}
