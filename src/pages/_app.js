// ** Next/ React Imports
import Head from 'next/head'
import { Router } from 'next/router'
import {useEffect, useState } from 'react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Component Imports
import Layout from 'src/components/layout/Layout'
import Loader from 'src/components/loader'

// ** Global css styles
import 'styles/globals.scss'

const DivisaITApp = ({ Component, pageProps }) => {
  // Loader
  const [openSimpleLoader, setOpenSimpleLoader] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
      setOpenSimpleLoader(true)
    })

    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
      setOpenSimpleLoader(false)
    })

    Router.events.on('routeChangeError', () => {
      NProgress.done()
      setOpenSimpleLoader(false)
    })

    return () => {
      Router.events.off('routeChangeStart', () => {
        NProgress.start()
        setOpenSimpleLoader(true)
      })
      Router.events.off('routeChangeComplete', () => {
        NProgress.done()
        setOpenSimpleLoader(false)
      })

      Router.events.off('routeChangeError', () => {
        NProgress.done()
        setOpenSimpleLoader(false)
      })
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>DivisaIT Proyecto</title>
        <meta name='description' content='Web app' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      {openSimpleLoader ? <Loader openLoadingScreen={openSimpleLoader} /> : <Component {...pageProps} />}
    </Layout>
  )
}

export default DivisaITApp
