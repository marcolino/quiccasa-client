import { encodeEmail } from "../../../libs/Misc";
import config from "../../../config";

export default function PrivacyPolicy() {
  const contents = (
    <>
      <h2>Privacy Policy</h2>
      <p><strong>Information pursuant to art. 13 of the Privacy Code</strong></p>
      <p><b>Pursuant to article 13 of the code of Legislative Decree 196/2003, we provide you with the following information.</b></p>
      <p>We at <strong><span id="site">{config.appSiteUrl}</span></strong>believe that the privacy of our visitors is extremely important. This document details the types of personal information collected and recorded by our site and how they are used.</p>
      <h3>Log Files</h3>
      <p>Like many other websites, ours uses log files. These files simply log visitors to the site - usually a standard procedure for hosting companies and hosting analytics services.</p>
      <p>The information contained in the log files includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), information such as date and time, referral pages, exit and entry pages or the number of click.</p>
      <p>This information is used to analyze trends, administer the site, track user movement on the site, and gather demographic information. IP addresses and other information are not linked to personal information that can be identified, therefore <strong>all data is collected absolutely anonymously</strong>.</p>
      <div id="cookies" style={{display: "block"}}>
        <h3>This website uses cookies</h3>
        <p>Cookies are small text files that are automatically placed on the browser's PC within the browser. They contain basic information on Internet browsing and thanks to the browser they are recognized every time the user visits the site.</p>
        <h3>Cookie Policy</h3>
        <p>This site uses cookies, including from third parties, to improve the browsing experience, allow surfers to use any online services and monitor site navigation.</p>
        <h3>How to disable cookies</h3>
        <p>It is possible to disable cookies directly from the browser used, by accessing the settings (preferences or options): this choice may limit some navigation features of the site.</p>
        <h3>Management of Cookies</h3>
        <p>The cookies used on this site may fall into the categories described below.</p>
        <ul>
          <li><strong>Activities strictly necessary for operation</strong>
            <br />
            These cookies are of a technical nature and allow the site to function properly. For example, they keep the user connected while browsing, preventing the site from requesting to log in several times to access subsequent pages.
          </li>
          <li><strong>Activity for saving preferences</strong>
            <br />
            These cookies allow you to remember the preferences selected by the user while browsing, for example, they allow you to set the language.
          </li>
          <li><strong>Statistical Activities and Audience Measurement (eg: Google Analytics)</strong>
            <br />
            These cookies help us to understand, through data collected in anonymous and aggregate form, how users interact with websites by providing information relating to the sections visited, the time spent on the site, any malfunctions. This helps improve the performance of websites.
          </li>
          <li><strong>Social media cookies (ex: Facebook)</strong>
            <br />
            These third-party cookies are used to integrate some common features of the main social media and provide them within the site. In particular, they allow registration and authentication on the site via facebook and google connect, the sharing and comments of pages of the site on social networks, enable the "like" on Facebook and "+1" on G + features.
          </li>
        </ul>
      </div>
      <div id="suppliers" style={{display: "none"}}>
        <h3>Third Party Providers</h3>
        <p>Third party vendors, including Google, use cookies to serve ads based on a user's previous visits to this site.</p>
        <p>The use of cookies for advertising allows Google and its partners to serve ads to the users of this site (and on other sites) based on the statistical data collected on this site and on the websites of Google partners.</p>
        <p>Users can choose to opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Ad Settings</ a>.</p>
        <p>By visiting the page {config.appSiteUrl} you can disable cookies from third-party suppliers.</p>
      </div>
      <div id="partners" style={{display: "none"}}>
        <h3>Our advertising partners</h3>
        <p>Some of our advertising partners may use cookies on our site to collect user browsing data anonymously. Our advertising partners include:</p>
        <ul>
          <li id="amazon" style={{display: "none"}}>Amazon</li>
          <li id="ebay" style={{display: "none"}}>Ebay</li>
          <li id="other_partners" style={{display: "none"}}><span id="partner"></span></li>
        </ul>
        <p>Third-party vendor advertisements operate advertising networks that use cookie technology in their respective advertisements and links that appear on our site. The ads are then sent directly to your browser. They will automatically receive your IP address. Other technologies (such as cookies or JavaScript) may also be used by our site's third-party ad networks to measure the effectiveness of their advertising campaigns and / or personalize the advertising content you see on the site.</p>
        <p>Our site does not have access to or does not control these cookies used by third party advertisers.</p>
        <h3>Third Party Privacy Policies</h3>
        <p>You should consult the respective privacy policies of these third-party servers for more information on their practices and for instructions on how to opt out of certain practices.</p>
        <p>Our privacy policy does not apply to third party vendors and advertising partners, and we cannot control the activities of such other advertisers or websites.</p>
        <p>If you wish to disable cookies, you can do so through your individual browser options. Further information on managing cookies with specific web browsers can be found on the respective browser websites</p>
      </div>
      <h3>Purpose of the processing</h3>
      <p>The data may be collected for one or more of the following purposes:</p>
      <ul>
        <li>provide access to restricted areas of the Portal and Portals / sites connected with this and to send communications, including commercial ones, news, updates on the initiatives of this site and of the companies controlled and / or connected by it and / or Sponsor.</li>
        <li>possible transfer of the aforementioned data to third parties, always aimed at creating email marketing campaigns and sending commercial communications.</li>
        <li>to carry out the obligations established by laws or regulations;</li>
        <li>contact management;</li>
      </ul>
      <h3>Processing methods</h3>
      <p>The data will be processed in the following ways:</p>
      <ul>
        <li>data collection with single-opt mode, in a specific database;</li>
        <li>recording and processing on paper and / or magnetic media;</li>
        <li>organization of archives in a mainly automated form, pursuant to the Technical Regulations on minimum security measures, Annex B of the Privacy Code.</li>
      </ul>
      <h3>Mandatory nature</h3>
      <p>All requested data are required.</p>
      <div id="treatment" style={{display: "none"}}>
        <h3>Subjects to whom personal data may be disclosed</h3>
        <p>The data collected may be disclosed to:</p>
        <ul>
          <li>companies and businesses for direct mailing or similar activities;</li>
          <li>associations and foundations wishing to purchase advertising space on the lists or on the site and / or connected to the provision of a particular service.</li>
          <li>subjects who must have access to data, as required by law or secondary and / or community regulations.</li>
        </ul>
      </div>
      <h3>Rights of the interested party</h3>
      <p>Pursuant to art. 7 (Right to access personal data and other rights) of the Privacy Code, we inform you that your rights regarding the processing of data are:</p>
      <ul>
        <li>to know, through free access, the existence of data processing that may concern you;</li>
        <li>be informed about the nature and purpose of the processing</li>
        <li>obtain from the owner, without delay:</li>
        <ul>
          <li>confirmation of the existence or not of personal data concerning you, even if not yet registered, and the communication in an intelligible form of the same data and their origin, as well as the logic and purposes on which the processing is based; the request can be renewed, unless there are justified reasons, after not less than ninety days;</li>
          <li>the cancellation, transformation into anonymous form or blocking of data treated in violation of the law, including those that do not need to be kept for the purposes for which the data were collected or subsequently processed;</li>
          <li>updating, rectification or, if interested, integration of existing data;</li>
          <li>object in whole or in part for legitimate reasons to the processing of personal data concerning you even if pertinent to the purpose of the collection;</li>
        </ul>
      </ul>
      <p>Please note that the data controller for all legal purposes is:</p>
      <ul>
        <li>Company of: <b><span id="company">{config.companyOwner}</span></b></li>
        <li id="piva" style={{display: "none"}}>P. VAT <span id="iva"></span></li>
        <li id="CodiceFiscale" s_tyle = {{display: "block"}}>Codice Fiscale: <span id="Codice_Fiscale">{config.companyOwnerFiscalCode}</span></li>
        <li>Address: <span id="address">{config.companyOwnerStreetAddress}</span></li>
        <li>City: <span id="zip code">{config.companyOwnerZipCode}</span>- <span id="city">{config.companyOwnerCity}</span>(<span id="province">{ config.companyOwnerProvince}</span>)</li>
        <li>Tel / Fax: <span id="telephone">{config.companyOwnerPhone}</span></li>
        <li>E-mail: <span id="email">{encodeEmail(config.companyOwnerEmail)}</span></li>
      </ul>
      <p>To exercise the rights provided for in art. 7 of the Privacy Code or for the cancellation of your data from the archive, simply contact us through one of the channels made available.</p>
      <p>All data is protected through the use of antivirus, firewall and password protection.</p>
      <h3>Information for children</h3>
      <p>We believe it is important to provide added protection for children online. We encourage parents and guardians to spend time online with their children to observe, participate in and / or monitor and guide their online activity. We do not collect personal data from minors. If a parent or guardian believes that our site has a child's personal information in its database, please contact us immediately (using the email provided) and we will do everything we can to remove this information as soon as possible.</p>
      <p>This privacy policy applies only to our online activities and is valid for visitors to our website and regarding information shared and / or collected. This policy does not apply to any information collected offline or through channels other than this website.</p>
      <h3>Consent</h3>
      <p>By using our website, you agree to our privacy policy and agree to its terms. If you would like more information or have any questions about our privacy policy, please do not hesitate to contact us.</p>
    </>
  );

  return contents;
}