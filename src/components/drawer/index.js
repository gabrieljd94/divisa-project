// ** React Imports
import Link from 'next/Link'
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const CustomDrawer = props => {
  // Data
  const { openDrawer, setOpenDrawer, pages } = props

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setOpenDrawer(false)
  }

  return (
    <Drawer anchor={'left'} open={openDrawer} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 280 }} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <List>
          {pages.map((item, index) => (
            <Fragment key={index + 1}>
              <ListItem disablePadding>
                <Link passHref href={item.url}>
                  <ListItemButton component={"a"}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default CustomDrawer
