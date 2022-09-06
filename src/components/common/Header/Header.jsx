import React, { Fragment } from "react";
import { Grid, Paper } from "@mui/material";

import './HeaderStyle.css';

const Header = () => {
  return (
    <Fragment>
      <Paper elevation={3} className='head-bg'>
        <Grid container spacing={2}>
          <Grid item xs={3} className='align-right'>
            <h3 className="head-title">React SQL Editor App</h3>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Header;
