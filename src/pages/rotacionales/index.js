// ** React Imports
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Imports
import Card from 'src/components/card'
import TitlePrimary from 'src/components/titles/Primary'

// ** Third Party
import axios from 'axios'

const AparcamientosPublicosPage = props => {
  // Data
  const { aparcamientos } = props
  //   const data = JSON.parse(aparcamientos)

  // Hooks
  const router = useRouter()

  // States
  const [aparcamientosData, setAparcamientosData] = useState(aparcamientos)

  // Functions / Handlers
  const handleClickAddress = props => {
    const currentAddress = props.target.dataset.address
    const currentLat = props.target.dataset.lat
    const currentLong = props.target.dataset.long

    //Open google maps
    router.replace(`https://maps.google.com/?ll=${currentLat},${currentLong}`)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <TitlePrimary title={'Aparcamientos Rotacionales de Madrid'} />
      </Grid>
      {aparcamientosData.map((item, index) => (
        <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
          <Card item={item} type={'rotacionales'} handleClickAddress={handleClickAddress} />
        </Grid>
      ))}
    </Grid>
  )
}

// Server
export async function getStaticProps(context) {
  // Getting data
  let aparcamientosData = []
  try {
    aparcamientosData = await axios.get(
      "https://datos.madrid.es/egob/catalogo/50027-2069434-AparcamientosOcupacionYServicios.json?language='es'"
    )
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      aparcamientos: JSON.parse(JSON.stringify(aparcamientosData.data))
    }
  }
}

export default AparcamientosPublicosPage
