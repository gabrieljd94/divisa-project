// ** React Imports
import { Fragment, useState } from 'react'
import Link from 'next/Link'

// ** MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

// ** Custom Imports
import Logo from 'src/components/logo'
import Drawer from 'src/components/drawer'

// Styles
import styles from './AppBar.module.scss'
import { useTheme } from '@mui/material/styles'

const pages = [
  { url: '/rotacionales', name: 'Aparcamientos Rotacionales'},
  { url: '/publicos', name: 'Aparcamientos Públicos' },
  // { url: '/sugerencia-aparcamiento', name: 'Sugiere un aparcamiento' }
]

const ResponsiveAppBar = () => {
  // Styles
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  // ** States
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  // Functions / Handlers
  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='fixed' sx={{ zIndex: 9 }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          {!hidden && (
            <Fragment>
              <IconButton
                sx={{ display: { xs: 'block', md: 'none' } }}
                size='large'
                aria-controls='menu'
                aria-haspopup='true'
                onClick={handleDrawer}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                sx={{ display: { xs: 'block', md: 'none' } }}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                pages={pages}
              />
            </Fragment>
          )}

          <Logo />

            <Box className={styles.contentBar}>
              {pages.map((item, index) => (
                <Link passHref href={item.url} key={index + 1}>
                  <Button className={styles.item} component={'a'} onClick={handleCloseNavMenu}>
                    {item.name}
                  </Button>
                </Link>
              ))}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
