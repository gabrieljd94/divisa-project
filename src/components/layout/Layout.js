// ** React Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// ** Custom Component Import
import AppBar from 'src/components/layout/AppBar'

// Styles
import styles from './Layout.module.scss'

const Layout = props => {
  // ** Props
  const { children } = props

  // ** Hooks
  const router = useRouter()

  return (
    <Box className={styles.layoutWrapper}>
      <Box className={styles.layoutWrapperContent}>
        <AppBar />

        <Container
          sx={{ ...(router.route === '/' && { marginTop: '0 !important', marginBottom: '0 !important' }) }}
          maxWidth='lg'
          className={styles.pageContent}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
