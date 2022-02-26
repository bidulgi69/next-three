import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { capitalize } from "../utils/function";

function Seo() {
    const router: NextRouter = useRouter()

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>
                {router.pathname === "/" ? "Home" : capitalize(router.pathname.replace("/", ""))} | Bidulgi69
            </title>
        </Head>
    )
}

export default Seo