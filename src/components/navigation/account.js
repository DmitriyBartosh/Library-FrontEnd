import React from 'react'
import { Link } from 'gatsby'
import { IoLayersOutline, IoDocumentTextOutline } from "react-icons/io5";
import { useStateContext } from '../../context/ContextProvider'
import * as button from '../../styles/base/button.module.scss'

function Account() {
  const { statusDirection } = useStateContext();

  const directionSelected = statusDirection?.design || statusDirection?.frontend || statusDirection?.photo;

  return directionSelected ?
    <Link to='/profile' className={button.nav}>
      <IoDocumentTextOutline className={button.icon} />
      <p className={button.text}>Мое портфолио</p>
    </Link>
    :
    <Link to='/directions' className={button.nav}>
      <IoLayersOutline className={button.icon} />
      <p className={button.text}>Направления</p>
    </Link>
}

export default Account