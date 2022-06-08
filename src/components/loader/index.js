import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';

// ** Styles
import { useTheme } from '@mui/material/styles'

const SimpleLoader = props => {
  const { openLoadingScreen, text } = props
  const theme = useTheme()

  const BackdropStyle = {
    zIndex: 20,
    backdropFilter: 'blur(1rem)',
    flexWrap: 'wrap',
    '& .wrapper': {
      textAlign: "center",
      '& h2': {
        color: theme.palette.common.white,
        fontWeight: 500,
        fontSize: {xs: theme.spacing(4), md: theme.spacing(8)},
        marginBottom: theme.spacing(6),
        maxWidth: {xs: theme.spacing(30), md: theme.spacing(50)},
        textAlign: 'center'
      },
      '& object, & svg, & span': {
        width: `${theme.spacing(12)} !important`,
        height: `${theme.spacing(12)} !important`
      }
    }
  }

  return (
    <Backdrop sx={BackdropStyle} open={openLoadingScreen}>
      <Box className='wrapper'>
        {text && <Typography component={'h2'}>{text}</Typography>}
        {/* <Loader/> */}
        <CircularProgress color='primary' />
      </Box>
    </Backdrop>
  )
}

export default SimpleLoader
