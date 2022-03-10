import React, { useState } from "react";
import PropTypes from "prop-types";
//import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
//import { useDrpzone } from "react-dropzone";
//import Button from "@material-ui/core/Button";
//import Paper from "@material-ui/core/Paper";
//import RootRef from "@material-ui/core/RootRef";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton } from "./TabsComponents";

// const useStyles = makeStyles(theme => ({
//   xul: {
//     padding: 15,
//   }
// }));

function Tab04Upload(props) {
  //const classes = useStyles();
  //const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
  const [ nextIsEnabled, setNextIsEnabled ] = useState(false);
  const [ file, setFile ] = useState(null);
  const {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  } = useDragAndDrop();

  const onDrop = (e) => {
    e.preventDefault();

    setDragOver(true);

    const selectedFile = e?.dataTransfer?.files[0];

    // TODO: check file type or name...
    // if (selectedFile.type.split("/")[0] !== "image") {
    //   return setFileDropError("Please provide an image file to upload!");
    // }

    setFile(selectedFile);
console.log("selected file:", selectedFile.name);
    setNextIsEnabled(true);
  };

  const fileSelect = (e) => {
    const selectedFile = e?.target?.files[0];
    // TODO: check file type or name...
    // if (selectedFile.type.split("/")[0] !== "image") {
    //   return setFileDropError("Please provide an image file to upload!");
    // }

    setFileDropError(null);
    setFile(selectedFile);
console.log("selected file:", selectedFile.name);
    setNextIsEnabled(true);
  };

  const onNext = () => {
    props.goto("next");
  };

  let uploadSize;
  if (window.innerHeight >= window.innerWidth) { // portrait
    uploadSize = window.innerWidth * .33;
  } else { // landscape
    uploadSize = window.innerWidth * .25;
  }
  return (
    <TabContainer>
      <TabBodyScrollable>
        <TabTitle>
          {t("Upload")}
        </TabTitle>
        <TabParagraph>
          Carica il foglio Excel compilato:
        </TabParagraph>

        <div className="container">
          <form>
            <label
              htmlFor="file"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              style={{ width: uploadSize, border: `${dragOver ? "3px dashed lightgreen" : ""}` }}
            >
              {file && <h1>{file.name}</h1>}
              {!file && (
                <h1 style={{ color: `${dragOver ? "lightgreen" : ""}` }}>
                  {!dragOver ? t("Drop the file here or click to select it...") : t("Drop here...")}
                </h1>
              )}
            </label>
            <input type="file" name="file" id="file" onChange={fileSelect} style={{display: "none"}} />
            {fileDropError && (
              <span className="file-drop-error">{fileDropError}</span>
            )}
          </form>
        </div>

      </TabBodyScrollable>

      <TabNextButton onNext={onNext} nextIsEnabled={nextIsEnabled}>
        {`${t("Continue")}`}
      </TabNextButton>
    </TabContainer>
  );
}
Tab04Upload.propTypes = {
  goto: PropTypes.func.isRequired,
};
Tab04Upload.defaultProps = {
};

export default React.memo(Tab04Upload);