import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton } from "./TabsComponents";
import config from "../config";

function Tab02Download(props) {
  const { t } = useTranslation();
  const [ nextIsEnabled, setNextIsEnabled ] = useState(false);

  const onNext = () => {
    props.goto("next");
  };

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = config.data.templateDownloadName;
    link.href = config.data.templateDownloadLink;
    link.click();
    setNextIsEnabled(true);
  };

  return (
    <TabContainer>
      <TabBodyScrollable>
        <TabTitle>
          {t("Download")}
        </TabTitle>
        <TabParagraph>
          Scarica il modello Excel in cui potrai inserire i dati degli appalti, uno per riga.
        </TabParagraph>
        <TabParagraph>
          <Button onClick={onDownload} variant="contained" color="primary">
            {t("Download")} ⬇
          </Button>
        </TabParagraph>
        <br />
        <TabParagraph small>
          <input type="checkbox"></input>
          Clicca qui se preferisci la versione ODS (Open Document Format),
          nel caso che tu utilizzi LibreOffice anziché Microsoft Office.
        </TabParagraph>
      </TabBodyScrollable>

      <TabNextButton onNext={onNext} nextIsEnabled={nextIsEnabled}>
        {`${t("Continue")}`}
      </TabNextButton>
    </TabContainer>
  );
}
Tab02Download.propTypes = {
  goto: PropTypes.func.isRequired,
};
Tab02Download.defaultProps = {
};

export default React.memo(Tab02Download);