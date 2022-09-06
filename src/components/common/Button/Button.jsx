import React, { Fragment } from "react";
import { Button } from "@mui/material";

import './ButtonStyle.css'

const PrimaryButton = ({onClick, className, text, Icon, variant}) => {
  return (
    <Fragment>
      <Button
        variant={variant}
        className={`primary-btn ${className}`}
        onClick={onClick}
      >
        <span className="btn-icn">{Icon ? Icon : ''}</span> {text}
      </Button>
    </Fragment>
  )
}

export {
  PrimaryButton
}