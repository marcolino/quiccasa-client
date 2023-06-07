import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton } from "./TabsComponents";

const useStyles = makeStyles(theme => ({
  xul: {
    padding: 15,
  }
}));

function Tab03FillData(props) {
  const classes = useStyles();
  //const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
const [ nextIsEnabled/*, setNextIsEnabled*/ ] = useState(true);

  const onNext = () => {
    props.goto("next");
  };

  return (
    <TabContainer>
      <TabBodyScrollable>
        <TabTitle>
          {t("Fill your data")}
        </TabTitle>
        <TabParagraph>
          Adesso puoi aprire il modello scaricato con il tuo programma di gestione fogli di lavoro.
        </TabParagraph>
        <TabParagraph>
          Sono presenti 2 fogli: "METADATI" ed "ELENCO GARE".
          Ti consigliamo di iniziare dal primo foglio, "METADATI", ed inserire i 4 dati generali richiesti:
          <ul className={classes.ul}>
            <li><i>codiceFiscaleStrutturaProponente</i> il codice fiscale della tua struttura</li>
            <li><i>denominazioneStrutturaProponente</i> la ragione sociale della tua struttura</li>
            <li><i>annoRiferimento</i> l'anno di riferimento per cui inserirai gli appalti</li>
            <li><i>urlFile</i> l'indirizzo URL dove sarà pubblicato il documento finale</li>
          </ul>
        </TabParagraph>
        <TabParagraph>
          A questo punto puoi passare al secondo foglio, "ELENCO GARE".
          Occorre inserire ogni apaplto (o "gara"), uno per riga.
        </TabParagraph>
        <TabParagraph>
          I campi da compilare sono:
          <ul className={classes.ul}>
            <li><i>CIG</i> il Codice Identificativo Gara</li>
            ... TODO: documentare tutti gli altri campi...
          </ul>
        </TabParagraph>
      </TabBodyScrollable>

      <TabNextButton onNext={onNext} nextIsEnabled={nextIsEnabled}>
        {`${t("Continue")}`}
      </TabNextButton>
    </TabContainer>
  );
}
Tab03FillData.propTypes = {
  goto: PropTypes.func.isRequired,
};
Tab03FillData.defaultProps = {
};

export default React.memo(Tab03FillData);