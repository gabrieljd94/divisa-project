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

  return (
    <Box className={styles.layoutWrapper}>
      <Box className={styles.layoutWrapperContent}>
        <AppBar />

        <Container maxWidth='lg' className={styles.pageContent}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
