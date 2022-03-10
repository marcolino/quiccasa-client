import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
//import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import RootRef from "@material-ui/core/RootRef";
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

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // TODO: do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log("binary string uploaded:", binaryStr);
        setNextIsEnabled(true);
      }
      reader.readAsArrayBuffer(file);
      console.log("FILE uploaded:", file);
      setFile(file);
    });
    
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const {ref, ...rootProps} = getRootProps();

  const onNext = () => {
    props.goto("next");
  };

  let uploadSize;
  if (window.innerHeight >= window.innerWidth) { // portrait
    uploadSize = window.innerWidth * .33;
  } else { // landscape
    uploadSize = window.innerWidth * .25;
  }
console.log("window.innerWidth:", window.innerWidth);
console.log("uploadSize:", uploadSize);

  return (
    <TabContainer>
      <TabBodyScrollable>
        <TabTitle>
          {t("Upload")}
        </TabTitle>
        <TabParagraph>
          Carica il foglio Excel compilato:
        </TabParagraph>

        <p style={{color: "#333", }}>{t("Drag 'n' drop some files here")}</p>
        <RootRef rootRef={ref}>
          <React.Fragment>
            <div {...rootProps} style={{flex: 1, backgroundImage: `url("upload-background.png")`, backgroundSize: "cover", textAlign:"center", width: uploadSize, height: uploadSize, padding: "1em", }}>
              <input {...getInputProps()} />
              <div style={{marginTop: 200}}>
                {t("or")} &nbsp;
                <Button type="button" variant="contained" color="primary" onClick={() => "open"}>
                  {t("Select file")}
                </Button>
              </div>
            </div>
          </React.Fragment>
        </RootRef>
        {file && (
          <>
            <br />
            <div>
              {t("File {{file}} was selected", {file: file.path})}
            </div>
          </>
        )}

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