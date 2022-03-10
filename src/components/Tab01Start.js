import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton, TabTooltip } from "./TabsComponents";

function Tab01Start(props) {
  //const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
  const [ nextIsEnabled /*, setNextIsEnabled*/ ] = useState(true);

  const onNext = () => {
    props.goto("next");
  };

  return (
    <TabContainer>
      <TabBodyScrollable>
        <TabTitle>
          {t("Welcome!")}
        </TabTitle>
        <TabParagraph>
          Questa è la nostra proposta per adempiere i requisiti della {" "}
          <a href="https://www.anticorruzione.it/-/adempimenti-legge-190/2012-art.-1-comma-32-7" target="legge190">
            Legge 190
          </a>
          . Speriamo che sia chiara e semplice da usare.
          </TabParagraph>
        <TabParagraph>
          Questa app ti guiderà passo passo nei pochi passi che occorrono per completare
          l'adempimento con successo.
        </TabParagraph>
        <TabParagraph>
          Per iniziare dovrai scaricare un modello Excel
          <TabTooltip
            title={"Può essere in formato MicroSoft-Excel, oppure in formato ODS, come preferisci."}
          >
          </TabTooltip>
          , che contiene delle regole per guidarti nella compilazione, e minimizzare i possibili errori formali.
        </TabParagraph>
        <TabParagraph>
          Poi dovrai inserire, uno per riga, tutti i beni o servizi che la tua struttura ha appaltato
          nell'anno in corso.
        </TabParagraph>
        <TabParagraph>
          Alla fine dell'anno, in genere entro la fine di Gennaio dell'anno successivo, sarà sufficiente
          caricare qui il foglio Excel compilato.
        </TabParagraph>
        <TabParagraph>
          A questo punto il nostro sistema effetturà il controllo formale dei dati inseriti.
          Nel caso che venga segnalato qualche anomalia dovrai correggere i problemi
          segnalati sul tuo file Excel, e poi ri-caricarlo.
        </TabParagraph>
        <TabParagraph>
          Dopodichè potrai scaricare il documento XML prodotto, che andrà pubblicato sul
          sito cui fa riferimento la tua struttura.
        </TabParagraph>
        <TabParagraph>
          A questo punto avrai praticamente completato l'adempimento.
          Se vorrai potrai controllare - sempre su questo sito - l'esito della verifica da parte
          dell'ANAC.
        </TabParagraph>
        <TabParagraph>
          Tieni presente che siamo sempre disponibili a risponderti per qualsiasi dubbio o
          incertezza. Le modalità di assistenza sono diverse, dal supporto telefonico a
          quello per email, e dipendono anche dal piano scelto.
          I riferimenti sono presenti nel menu in alto a sinistra, in "Supporto".
        </TabParagraph>
      </TabBodyScrollable>

      <TabNextButton onNext={onNext} nextIsEnabled={nextIsEnabled}>
        {`${t("Start")}`}
      </TabNextButton>
    </TabContainer>
  );
}
Tab01Start.propTypes = {
  goto: PropTypes.func.isRequired,
};
Tab01Start.defaultProps = {
};

export default React.memo(Tab01Start);
