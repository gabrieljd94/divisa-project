// React Imports
import Link from 'next/link'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Styles
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <Link passHref href={'/'}>
      <Typography className={styles.logo} variant='h3' component='a'>
        Aparcamientos
        <span>Madrid</span>
      </Typography>
    </Link>
  )
}

export default Logo
