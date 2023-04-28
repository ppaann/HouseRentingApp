import React from 'react'
import styles from './index.module.css'

import NavHeader from '../../components/NavHeaders'
const Map = () => {
  return (
    <>
      <NavHeader>地图找房</NavHeader>
      <div id="container" className={styles.map}>Map</div>
    </>
  )
}

export default Map
