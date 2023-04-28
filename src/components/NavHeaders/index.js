import React from 'react'
import { NavBar } from "antd-mobile"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './index.module.css'


export default function NavHeader({ children, onLeftClicked }) {

  const navigate = useNavigate();
  const defaultHandler = () => {
    navigate(-1)
  }
  return (
    <NavBar onBack={onLeftClicked || defaultHandler}
      className={styles.navBar}>
      {children}
    </NavBar>
  )
}

NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClicked: PropTypes.func
}