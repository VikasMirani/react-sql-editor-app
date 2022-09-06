import React, { Fragment } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import { PrimaryButton } from "../Button/Button";

import { Grid } from "@mui/material";

const Editor = ({ setQuery, value, setQType, setShowTable }) => {
  const onChange = (newValue) => {
    setQuery(newValue);
  };

  const onSubmit = () => {
    var Z = value.toLowerCase().slice(value.indexOf("from") + "from".length);
    setQType(Z.split(" ")[1]);
    setShowTable(true);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label htmlFor="editor">
            <AceEditor
              id="editor"
              aria-label="editor"
              mode="mysql"
              theme="github"
              name="editor"
              fontSize={16}
              minLines={15}
              maxLines={10}
              width="100%"
              showPrintMargin={false}
              showGutter
              placeholder="Write your Query here..."
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              value={value}
              onChange={onChange}
              showLineNumbers
            />
          </label>
        </Grid>
        <Grid item xs={12}>
          <PrimaryButton
            onClick={onSubmit}
            className="Run-btn"
            text="Run Query"
            Icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <title id="run">run query</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            }
            variant="contained"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Editor;
