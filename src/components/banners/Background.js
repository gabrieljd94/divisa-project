// ** React Imports
import Image from 'next/image'

// ** Custom Component Import
import imgBg from '/public/images/madrid.jpg'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styles
import styles from "./BackgroundBanner.module.scss"

const BackgroundBanner = () => {
  return (
    <Box className={styles.wrapper}>
      <Image
      className={styles.imgBg}
        src={imgBg}
        alt={'Madrid'}
        layout='fill'
        objectFit='cover'
        quality={100}
        placeholder='blur'
      />

      <Typography component={'h1'} className={styles.title}> Aparcamientos <span>públicos en Madrid</span></Typography>
    </Box>
  )
}

export default BackgroundBanner
