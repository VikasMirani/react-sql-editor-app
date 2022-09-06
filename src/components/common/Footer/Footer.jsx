import React, { Fragment } from "react";
import { Grid } from "@mui/material";

import "./FooterStyle.css";

const Footer = () => {
  return (
    <Fragment>
      <Grid container spacing={2} className='foot-bg'>
        <Grid item xs={12} className="align-center">
          <h3 className="foot-title">
            Made with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className='lov-icon'
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <title id="heart">Made With Love</title>
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
            <a className='foot-a' href="https://github.com/VikasMirani">Vikas Mirani</a>
          </h3>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Footer;
