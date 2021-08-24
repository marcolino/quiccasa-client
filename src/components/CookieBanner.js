import React, { useEffect }  from "react";
import Link from "@material-ui/core/Link";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";



export default function CookieBanner() {
  const { t } = useTranslation();
  const scrollOffsetMin = 100;

  // an alternative to `CookieConsent.dismissOnScroll`, not yet available
  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= scrollOffsetMin) {
        const now = new Date(); const date = new Date(now.setFullYear(now.getFullYear() + 1)).toUTCString(); // +1 year from now
        document.cookie = `CookieConsent=true; expires=${date}; sameSite=Lax`;
        window.removeEventListener("scroll", onScroll);
        //accept();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <CookieConsent
      location="bottom"
      buttonText={t("I agree")}
      style={{ fontFamily: "Open Sans", color:"#999999", background: "#2b373b", display: "block" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px", float: "right" }}
      expires={365}
      dismissOnScroll={true} // TODO: not handled yet
    >
      {t("We use cookies or similar technologies as specified in the")} {" "}
        <Link color="primary" href={"/privacy-policy"}>
          {t("privacy policy")}
        </Link>
      {"."} {" "} {t("You can consent to the use of such technologies by closing this notice")}
      {","} {" "} {t("or by otherwise continuing interacting with this site.")}
    </CookieConsent>
  );
}