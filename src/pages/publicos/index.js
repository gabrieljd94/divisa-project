// ** React Imports
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'

// ** Custom Imports
import Card from 'src/components/card'
import TitlePrimary from 'src/components/titles/Primary'
import Loader from 'src/components/loader'

// ** Third Party
import axios from 'axios'
import haversine from 'haversine-distance'
import requestIp from 'request-ip'

const AparcamientosPublicosPage = props => {
  // Data
  const { aparcamientos } = props

//   const data = JSON.parse(aparcamientos)
//   const aparcamientosFormatted = data['@graph']

  const aparcamientosFormatted = aparcamientos

  // Hooks
  const router = useRouter()

  // States
  const [aparcamientosData, setAparcamientosData] = useState(aparcamientosFormatted)
  const [showAlert, setShowAlert] = useState(false)
  const [openSimpleLoader, setOpenSimpleLoader] = useState(false)

  // Functions / Handlers
  const handleClickAddress = props => {
    const currentAddress = props.target.dataset.address
    const currentLat = props.target.dataset.lat
    const currentLong = props.target.dataset.long

    //Open google maps
    router.replace(`https://maps.google.com/?ll=${currentLat},${currentLong}`)
  }

  //   const handleFilter = async () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(showPosition, showError)
  //       setShowAlert(false)
  //     } else {
  //       setShowAlert(true)
  //     }

  //     async function showPosition(position) {
  //       // Hide alert
  //       setShowAlert(false)

  //       //Show Loader
  //       setOpenSimpleLoader(true)

  //       //Calculate distance
  //       const userDistance = { lat: position.coords.latitude, lon: position.coords.longitude }

  //       //Setting KM distance
  //       await aparcamientosData.map(item => {
  //         if (!item.distanceKM) {
  //           let originalDistance = { lat: item.location.latitude, lng: item.location.longitude }
  //           let distanceKM = haversine(userDistance, originalDistance) / 1000

  //           item.distanceKM = distanceKM
  //         }
  //       })

  //       // Order by distance KM
  //       const newOrderAparcamientos = await aparcamientosData.sort(
  //         (a, b) => parseFloat(a.distanceKM) - parseFloat(b.distanceKM)
  //       )
  //       setAparcamientosData(newOrderAparcamientos)

  //       //Hiding loader
  //       setOpenSimpleLoader(false)
  //     }

  //     function showError(error) {
  //       if (error.PERMISSION_DENIED) {
  //         setShowAlert(true)
  //       }
  //     }
  //   }

  return (
    <Fragment>
      <Loader text={'Buscando aparcamientos cercanos...'} openLoadingScreen={openSimpleLoader} />
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TitlePrimary
            title={'Aparcamientos públicos de Madrid'}
            // btnOnClick={handleFilter}
            // btnText={'Ordenar por mi ubicación'}
          />
        </Grid>
        <Grid textAlign={'center'} item xs={12}>
          <Collapse in={showAlert}>
            <Alert sx={{ display: 'inline-flex' }} severity='warning'>
              No podemos ordenar los aparcamientos si no concedes acceso a tu ubicación
            </Alert>
          </Collapse>
        </Grid>
        {aparcamientosData.map((item, index) => (
          <Grid key={index} item sm={12} md={6} lg={4}>
            <Card item={item} handleClickAddress={handleClickAddress} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

// Server
export async function getServerSideProps({ req }) {
  // Getting data
  let aparcamientosData = []
  try {
    aparcamientosData = await axios.get('https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json')
    aparcamientosData = await aparcamientosData.data.replace('--', '-')
  } catch (error) {
    console.log(error)
  }

  //Order by distance
  const userIp = requestIp.getClientIp(req)

  let distanceByIP
  try {
    //Getting distance lat/long by user ip
    distanceByIP = await axios.get(`http://ip-api.com/json/`)

    if (distanceByIP && aparcamientosData) {
      const userDistance = { lat: distanceByIP.data.lat, lon: distanceByIP.data.lon }
      
      //Setting KM distance
      aparcamientosData =  JSON.parse(aparcamientosData)
      aparcamientosData =  aparcamientosData['@graph']
      await aparcamientosData.map(item => {
        let originalDistance = { lat: item.location.latitude, lng: item.location.longitude }
        let distanceKM = haversine(userDistance, originalDistance) / 1000

        item.distanceKM = distanceKM
      })

      // Order by distance KM
      await aparcamientosData.sort((a, b) => parseFloat(a.distanceKM) - parseFloat(b.distanceKM))
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      aparcamientos: JSON.parse(JSON.stringify(aparcamientosData))
    }
  }
}

export default AparcamientosPublicosPage
