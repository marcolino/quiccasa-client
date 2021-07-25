import React, { useEffect }  from "react";
import Link from "@material-ui/core/Link";
import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {

  const scrollOffsetMin = 100;

  // TODO: an alternative to `dismissOnScroll`, not available yet
  useEffect(() => {
    const onScroll = e => {
//console.log('scrollTop:', e.target.documentElement.scrollTop);
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
      buttonText={"I agree"}
      style={{ fontFamily: "Open Sans", background: "#2B373B", display: "block" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px", float: "right" }}
      expires={365}
      dismissOnScroll={true} // TODO: not handled yet
    >
      {"We use cookies or similar technologies as specified in the "}
        <Link color="inherit" href={"/privacy-policy"}>
          {"privacy policy"}
        </Link>
      {"."} {" "} {"You can consent to the use of such technologies by closing this notice"}
      {","} {" "} {"or by otherwise continuing interacting with this site."}
    </CookieConsent>
  );
}