import Head from "next/head"
import React from "react"


export default function Wrapper(): JSX.Element {
    const favIcon = '/favicon.ico'

    return (
        <Head>
            <title>The Machine Musician</title>
            <link href={favIcon} rel="shortcut icon" />
            <meta content="Machine Muscian" name="og:title" property="og:title" />
        </Head>
    )
}
