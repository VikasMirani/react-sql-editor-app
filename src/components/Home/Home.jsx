import React, { Fragment, useEffect, useState, forwardRef } from "react";
import alasql from "alasql";
import { Grid, TableCell, TableRow, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import Editor from "../common/Editor/Editor";
import TableComponent from "../common/Table/Table";
import CircularProgress from "@mui/material/CircularProgress";
import TABLE_NAMES from "../../constants/constants";

import "./HomeStyle.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
  const [data, setData] = useState([]);
  const [col1, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("select * from customers");
  const [qType, setQType] = useState("");
  const [loader, showLoader] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    if (qType) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qType]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getData = () => {
    const name = TABLE_NAMES.find((name) => name === qType);
    if (name) {
      showLoader(true);
      const convertToJson = (data) => {
        alasql
          .promise("SELECT * FROM CSV(?, {headers: false, separator:','})", [
            data,
          ])
          .then((data) => {
            let list = Object.entries(data[0]).map((d) => {
              return { id: d[1], label: d[1] };
            });
            let list1 = data.slice(1);
            let list2 = list1.map((y, i) => (
              <TableRow key={i}>
                {Object.entries(y).map((c, v) => (
                  <TableCell key={v}>{c[1]}</TableCell>
                ))}
              </TableRow>
            ));
            setColumns(list);
            setRows(list2);
            setData(list1);
            setOpen(true);
            setSeverity("success");
            setMsg("Query run successfully");
          })
          .catch((e) => {
            setOpen(true);
            setSeverity("error");
            setMsg(e.message);
          });
      };
      const url = `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${qType}.csv`;
      fetch(url, {
        headers: {
          Accept: "application/vnd.github.v4+raw",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((resp) => {
          convertToJson(atob(resp.content.replace("\n", "")));
          showLoader(false);
        })
        .catch((err) => {
          setOpen(true);
          setSeverity("error");
          setMsg(err.message);
        });
    } else {
      setOpen(true);
      setSeverity("error");
      setShowTable(false);
      setMsg("Please enter a valid query");
    }
  };

  return (
    <Fragment>
      <Header />
      <Grid container spacing={2} className="main-content">
        <Grid item xs={12}>
          <Editor
            value={query}
            setQuery={setQuery}
            qType={qType}
            setQType={setQType}
            setShowTable={setShowTable}
          />
        </Grid>
        {showTable ? (
          loader ? (
            <Grid item xs={12} className="align-center">
              <CircularProgress color="inherit" />
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableComponent col1={col1} rows={rows} dataList={data} />
              </Grid>
            </Grid>
          )
        ) : (
          ""
        )}
      </Grid>
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      ;
    </Fragment>
  );
};

export default Home;
