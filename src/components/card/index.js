import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Styles
import styles from './Card.module.scss'

const ListItemCard = props => {
  // Data
  const { item, handleClickAddress, type } = props

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <Box className={`${styles.top} ${type && styles.compact}`}>
          <Typography component={'span'} className={styles.postalCode}>
            Código postal <strong>{!type ? item.address['postal-code'] : item.areaCode}</strong>
          </Typography>
          <Typography className={styles.title} variant='h4'>
            {!type ? item.title : item.name}
          </Typography>
          <Typography className={styles.address}>
            {!type ? item.address['street-address'] : `Dirección: ${item.address}`}
          </Typography>
        </Box>
        <Divider className={`${styles.divider} ${type && styles.compact}`} />
        {!type && (
          <Typography className={styles.description}>Descripción: {item.organization['organization-desc']}</Typography>
        )}
      </CardContent>
      <CardActions className={styles.actions}>
        <Button
          className={styles.button}
          data-lat={!type ? item.location.latitude : item.latitude}
          data-long={!type ? item.location.longitude : item.longitude}
          data-address={!type ? item.address['street-address'] : item.address}
          onClick={handleClickAddress}
          size='large'
        >
          Como llegar
        </Button>
      </CardActions>
    </Card>
  )
}

export default ListItemCard
