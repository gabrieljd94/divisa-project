// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Styles
import styles from './Primary.module.scss'

const PrimaryTitle = props => {
  const { title, btnText, btnOnClick } = props

  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.title} variant={'h1'} component={'h1'}>
        {title}
      </Typography>
      {btnText && <Button className={styles.button} onClick={btnOnClick} size='large' variant={'contained'} color={'primary'}>{btnText}</Button>}
    </Box>
  )
}

export default PrimaryTitle
