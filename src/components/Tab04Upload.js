import React, { useState } from "react";
import PropTypes from "prop-types";
//import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
//import { useDrpzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
//import Paper from "@material-ui/core/Paper";
//import RootRef from "@material-ui/core/RootRef";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton } from "./TabsComponents";
//import { ControlPointDuplicateOutlined } from "@material-ui/icons";



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
    const selectedFile = e?.dataTransfer?.files[0];
//console.log("dropped file:", selectedFile);
    fileSelect(selectedFile);
  };

  const onFileSelect = (e) => {
    e.preventDefault();
    const selectedFile = e?.target?.files[0];
//console.log("selected file:", selectedFile);
    fileSelect(selectedFile);
  };

  const fileSelect = (selectedFile) => {
    setFileDropError(null);
    if (!fileValidate(selectedFile)) return;
    setFile(selectedFile);
    setNextIsEnabled(true);
    setDragOver(false);
  };

  const fileValidate = (file) => { // validate file type or name
    // ods: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    // xls: application/vnd.ms-excel
    //console.log("file.type:", file.type);
    if (!( // TODO: check if these tests are enough general...
      file.type.split("/")[1].match("officedocument.spreadsheetml.sheet") ||
      file.type.split("/")[1].match("ms-excel")
    )) {
      setFileDropError(t("Please provide a spreadsheet to upload"));
      return false;
    }
    return true;
  };

  const fileReset = (e) => {
    setFile(null);
    document.getElementById("file").value = "";
    setFileDropError("");
  };

  const onNext = () => {
    props.goto("next");
  };

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
              style={{ width: "100%", textAlign: "center", backgroundColor: `${dragOver ? "yellow" : ""}`}}
            >
              <h4 style={{ color: `${dragOver ? "black" : "#333"}` }}>
                {t("Drop the file here or click to select from disk")}
              </h4>
            </label>
            <input type="file" name="file" id="file" onChange={onFileSelect} style={{display: "none"}} />
            {fileDropError && (
                <div className="file-drop-error">{fileDropError}</div>
            )}
          </form>
          <br />
          <TabParagraph>
            {file && t(`File caricato: ${file.name}`)}
            <br />
            {file && <Button variant="contained" size="small" color="default" onClick={fileReset} title={t("Remove file")}> 🗑 </Button>}
          </TabParagraph>
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