import React, { useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
//import Button from "@material-ui/core/Button";
import { toast } from "./Toast";
import { TabContainer, TabBodyScrollable, TabTitle, TabParagraph, TabNextButton } from "./TabsComponents";
import { transformXls2Xml } from "../libs/Fetch";
//import config from "../config";

function Tab05Check(props) { // TODO: we need file here...
  const { t } = useTranslation();
  const [ nextIsEnabled/*, setNextIsEnabled*/ ] = useState(false);

  useEffect(() => {
console.log("Tab05Check props:", props)
    if (props.value === props.index) {
      (async () => {
        await transformXls2Xml({file: props.file}).then(data => {
          if (!data.ok) {
            //console.warn("transformXls2Xml error:", JSON.stringify(data));
            toast.error(t(data.message));
            return;
          }
          console.log("getUsers success:", data);
        }).catch(err => {
          console.error("getUsers error catched:", err);
          toast.error(t(err.message));
        });
      })();
    }
  }, [props, t]);

  const onNext = () => {
    props.goto("next");
  };

  return (
    <TabContainer>
      <TabBodyScrollable>
        <TabTitle>
          {t("Check")}
        </TabTitle>
        <TabParagraph>
          Elaborazione in corso...
        </TabParagraph>
      </TabBodyScrollable>

      <TabNextButton onNext={onNext} nextIsEnabled={nextIsEnabled}>
        {`${t("Continue")}`}
      </TabNextButton>
    </TabContainer>
  );
}
Tab05Check.propTypes = {
  goto: PropTypes.func.isRequired,
};
Tab05Check.defaultProps = {
};

export default React.memo(Tab05Check);