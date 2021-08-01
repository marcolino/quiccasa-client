import { makeStyles } from "@material-ui/styles";
import { Trans, useTranslation } from 'react-i18next'
import config from "../config";

const useStyles = makeStyles(theme => ({
	privacy: {
	},
}));

export default function PrivacyPolicy() {
	const classes = useStyles();
  const { t } = useTranslation();

  // TODO: remove spaces
  const contents = (
    <>
      <h2> Privacy Policy </h2>
        <p> <strong> Information pursuant to art. 13 of the Privacy Code </strong> </p>
        <p> <b> Pursuant to article 13 of the code of Legislative Decree 196/2003, we provide you with the following information. </b> </p>
        <p> We at <strong> <span id="site"> {config.appSiteUrl} </span> </strong> believe that the privacy of our visitors is extremely important. This document details the types of personal information collected and recorded by our site and how they are used. </p>
        <h3> Log Files </h3>
        <p> Like many other websites, ours uses log files. These files simply log visitors to the site - usually a standard procedure for hosting companies and hosting analytics services. </p>
        <p> The information contained in the log files includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), information such as date and time, referral pages, exit and entry pages or the number of click. </p>
        <p> This information is used to analyze trends, administer the site, track user movement on the site, and gather demographic information. IP addresses and other information are not linked to personal information that can be identified, therefore <strong> all data is collected absolutely anonymously </strong>. </p>
        <div id="cookies" style={{display: "block"}}>
          <h3> This website uses cookies </h3>
          <p> Cookies are small text files that are automatically placed on the browser's PC within the browser. They contain basic information on Internet browsing and thanks to the browser they are recognized every time the user visits the site. </p>
          <h3> Cookie Policy </h3>
          <p> This site uses cookies, including from third parties, to improve the browsing experience, allow surfers to use any online services and monitor site navigation. </p>
          <h3> How to disable cookies </h3>
          <p> It is possible to disable cookies directly from the browser used, by accessing the settings (preferences or options): this choice may limit some navigation features of the site. </p>
          <h3> Management of Cookies </h3>
          <p> The cookies used on this site may fall into the categories described below. </p>
          <ul>
            <li> <strong> Activities strictly necessary for operation </strong>
              <br />
              These cookies are of a technical nature and allow the site to function properly. For example, they keep the user connected while browsing, preventing the site from requesting to log in several times to access subsequent pages.
            </li>
            <li> <strong> Activity for saving preferences </strong>
              <br />
              These cookies allow you to remember the preferences selected by the user while browsing, for example, they allow you to set the language.
            </li>
            <li> <strong> Statistical Activities and Audience Measurement (eg: Google Analytics) </strong>
              <br />
              These cookies help us to understand, through data collected in anonymous and aggregate form, how users interact with websites by providing information relating to the sections visited, the time spent on the site, any malfunctions. This helps improve the performance of websites.
            </li>
            <li> <strong> Social media cookies (ex: Facebook) </strong>
              <br />
              These third-party cookies are used to integrate some common features of the main social media and provide them within the site. In particular, they allow registration and authentication on the site via facebook and google connect, the sharing and comments of pages of the site on social networks, enable the "like" on Facebook and "+1" on G + features.
            </li>
          </ul>
        </div>
        <div id="suppliers" style={{display: "none"}}>
          <h3> Third Party Providers </h3>
          <p> Third party vendors, including Google, use cookies to serve ads based on a user's previous visits to this site. </p>
          <p> The use of cookies for advertising allows Google and its partners to serve ads to the users of this site (and on other sites) based on the statistical data collected on this site and on the websites of Google partners. </p>
          <p> Users can choose to opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer"> Ad Settings </ a>. </p>
          <p> By visiting the page {config.appSiteUrl} you can disable cookies from third-party suppliers. </p>
        </div> 
        <div id="partners" style={{display: "none"}}>
          <h3> Our advertising partners </h3>
          <p> Some of our advertising partners may use cookies on our site to collect user browsing data anonymously. Our advertising partners include: </p>
          <ul>
            <li id="amazon" style={{display: "none"}}> Amazon </li>
            <li id="ebay" style={{display: "none"}}> Ebay </li>
            <li id="other_partners" style={{display: "none"}}> <span id="partner"> </span> </li>
          </ul>
          <p> Third-party vendor advertisements operate advertising networks that use cookie technology in their respective advertisements and links that appear on our site. The ads are then sent directly to your browser. They will automatically receive your IP address. Other technologies (such as cookies or JavaScript) may also be used by our site's third-party ad networks to measure the effectiveness of their advertising campaigns and / or personalize the advertising content you see on the site. </p>
          <p> Our site does not have access to or does not control these cookies used by third party advertisers. </p>
          <h3> Third Party Privacy Policies </h3>
          <p> You should consult the respective privacy policies of these third-party servers for more information on their practices and for instructions on how to opt out of certain practices. </p>
          <p> Our privacy policy does not apply to third party vendors and advertising partners, and we cannot control the activities of such other advertisers or websites. </p>
          <p> If you wish to disable cookies, you can do so through your individual browser options. Further information on managing cookies with specific web browsers can be found on the respective browser websites </p>
        </div>
        <h3> Purpose of the processing </h3>
        <p> The data may be collected for one or more of the following purposes: </p>
        <ul>
          <li> provide access to restricted areas of the Portal and Portals / sites connected with this and to send communications, including commercial ones, news, updates on the initiatives of this site and of the companies controlled and / or connected by it and / or Sponsor. </li>
          <li> possible transfer of the aforementioned data to third parties, always aimed at creating email marketing campaigns and sending commercial communications. </li>
          <li> to carry out the obligations established by laws or regulations; </li>
          <li> contact management; </li>
        </ul>
        <h3> Processing methods </h3>
        <p> The data will be processed in the following ways: </p>
        <ul>
          <li> data collection with single-opt mode, in a specific database; </li>
          <li> recording and processing on paper and / or magnetic media; </li>
          <li> organization of archives in a mainly automated form, pursuant to the Technical Regulations on minimum security measures, Annex B of the Privacy Code. </li>
        </ul>
        <h3> Mandatory nature </h3>
        <p> All requested data are required. </p>
        <div id="treatment" style={{display: "none"}}>
          <h3> Subjects to whom personal data may be disclosed </h3>
          <p> The data collected may be disclosed to: </p>
          <ul>
            <li> companies and businesses for direct mailing or similar activities; </li>
            <li> associations and foundations wishing to purchase advertising space on the lists or on the site and / or connected to the provision of a particular service. </li>
            <li> subjects who must have access to data, as required by law or secondary and / or community regulations. </li>
          </ul>
        </div>
        <h3> Rights of the interested party </h3>
        <p> Pursuant to art. 7 (Right to access personal data and other rights) of the Privacy Code, we inform you that your rights regarding the processing of data are: </p>
        <ul>
          <li> to know, through free access, the existence of data processing that may concern you; </li>
          <li> be informed about the nature and purpose of the processing </li>
          <li> obtain from the owner, without delay: </li>
          <ul>
            <li> confirmation of the existence or not of personal data concerning you, even if not yet registered, and the communication in an intelligible form of the same data and their origin, as well as the logic and purposes on which the processing is based; the request can be renewed, unless there are justified reasons, after not less than ninety days; </li>
            <li> the cancellation, transformation into anonymous form or blocking of data treated in violation of the law, including those that do not need to be kept for the purposes for which the data were collected or subsequently processed; </li>
          <li> updating, rectification or, if interested, integration of existing data; </li>
          <li> object in whole or in part for legitimate reasons to the processing of personal data concerning you even if pertinent to the purpose of the collection; </li>
        </ul>
      </ul>
      <p> Please note that the data controller for all legal purposes is: </p>
      <ul>
        <li> Company of: <b> <span id="company"> {config.companyOwner} </span> </b> </li>
        <li id="piva" style={{display: "none"}}> P. VAT <span id="iva"> </span> </li>
        <li id="CodiceFiscale" s_tyle = {{display: "block"}}> Codice Fiscale: <span id="Codice_Fiscale"> {config.companyOwnerFiscalCode} </span> </li>
        <li> Address: <span id="address"> {config.companyOwnerStreetAddress} </span> </li>
        <li> City: <span id="zip code"> {config.companyOwnerZipCode} </span> - <span id="city"> {config.companyOwnerCity} </span> (<span id="province"> { config.companyOwnerProvince} </span>) </li>
        <li> Tel / Fax: <span id="telephone"> {config.companyOwnerPhone} </span> </li>
        <li> E-mail: <span id="email"> {config.companyOwnerEmail} </span> </li>
      </ul>
      <p> To exercise the rights provided for in art. 7 of the Privacy Code or for the cancellation of your data from the archive, simply contact us through one of the channels made available. </p>
      <p> All data is protected through the use of antivirus, firewall and password protection. </p>
      <h3> Information for children </h3>
      <p> We believe it is important to provide added protection for children online. We encourage parents and guardians to spend time online with their children to observe, participate in and / or monitor and guide their online activity. We do not collect personal data from minors. If a parent or guardian believes that our site has a child's personal information in its database, please contact us immediately (using the email provided) and we will do everything we can to remove this information as soon as possible. </p>
      <p> This privacy policy applies only to our online activities and is valid for visitors to our website and regarding information shared and / or collected. This policy does not apply to any information collected offline or through channels other than this website. </p>
      <h3> Consent </h3>
      <p> By using our website, you agree to our privacy policy and agree to its terms. If you would like more information or have any questions about our privacy policy, please do not hesitate to contact us. </p>
    </>
  );    
        
  const contents_it = (
    <>
      <h2>Privacy Policy</h2>
      <p><strong>Informativa ai sensi dell'art. 13 del Codice della Privacy</strong></p>
      <p><b>Ai sensi dell'articolo 13 del codice della D.Lgs. 196/2003, vi rendiamo le seguenti informazioni.</b></p>
      <p>Noi di <strong><span id="sito">{config.appSiteUrl}</span></strong> riteniamo che la privacy dei nostri visitatori sia estremamente importante. Questo documento descrive dettagliatamente i tipi di informazioni personali raccolti e registrati dal nostro sito e come essi vengano utilizzati.</p>
      <h3>File di Registrazione (Log Files)</h3>
      <p>Come molti altri siti web, il nostro utilizza file di log. Questi file registrano semplicemente i visitatori del sito - di solito una procedura standard delle aziende di hosting e dei servizi di analisi degli hosting.</p>
      <p>Le informazioni contenute nei file di registro comprendono indirizzi di protocollo Internet (IP), il tipo di browser, Internet Service Provider (ISP), informazioni come data e ora, pagine referral, pagine d'uscita ed entrata o il numero di clic.</p>
      <p>Queste informazioni vengono utilizzate per analizzare le tendenze, amministrare il sito, monitorare il movimento degli utenti sul sito e raccogliere informazioni demografiche. Gli indirizzi IP e le altre informazioni non sono collegate a informazioni personali che possono essere identificate, dunque <strong>tutti i dati sono raccolti in forma assolutamente anonima</strong>.</p>
      <div id="cookies" style={{display: "block"}}>
        <h3>Questo sito web utilizza i Cookies</h3>
        <p>I cookies sono piccoli file di testo che vengono automaticamente posizionati sul PC del navigatore all’interno del browser. Essi contengono informazioni di base sulla navigazione in Internet e grazie al browser vengono riconosciuti ogni volta che l’utente visita il sito.</p>
        <h3>Cookie Policy</h3>
        <p>Questo sito utilizza cookies, anche di terze parti, per migliorarne l’esperienza di navigazione, consentire a chi naviga di usufruire di eventuali servizi online e monitorare la navigazione nel sito.</p>
        <h3>Come disabilitare i Cookies</h3>
        <p>E’ possibile disabilitare i cookies direttamente dal browser utilizzato, accedendo alle impostazioni (preferenze oppure opzioni): questa scelta potrebbe limitare alcune funzionalità di navigazione del sito.</p>
        <h3>Gestione dei Cookies</h3>
        <p>I cookies utilizzati in questo sito possono rientrare nelle categorie descritte di seguito.</p>
        <ul>
          <li><strong>Attività strettamente necessarie al funzionamento</strong>
            <br />
            Questi cookies hanno natura tecnica e permettono al sito di funzionare correttamente. Ad esempio, mantengono l’utente collegato durante la navigazione evitando che il sito richieda di collegarsi più volte per accedere alle pagine successive.
          </li>
          <li><strong>Attività di salvataggio delle preferenze</strong>
            <br />
            Questi cookie permettono di ricordare le preferenze selezionate dall’utente durante la navigazione, ad esempio, consentono di impostare la lingua.
          </li>
          <li><strong>Attività Statistiche e di Misurazione dell’audience (es: Google Analytics)</strong>
            <br />
            Questi cookie ci aiutano a capire, attraverso dati raccolti in forma anonima e aggregata, come gli utenti interagiscono con i siti internet fornendo informazioni relative alle sezioni visitate, il tempo trascorso sul sito, eventuali malfunzionamenti. Questo aiuta a migliorare la resa dei siti internet.
          </li>
          <li><strong>Cookie di social media (es: Facebook)</strong>
            <br />
            Questi cookie di terza parte vengono utilizzati per integrare alcune diffuse funzionalità dei principali social media e fornirle all’interno del sito. In particolare permettono la registrazione e l’autenticazione sul sito tramite facebook e google connect, la condivisione e i commenti di pagine del sito sui social, abilitano le funzionalità del “mi piace” su Facebook e del “+1″ su G+.
          </li>
        </ul>
      </div>
      <div id="fornitori" style={{display: "none"}}>
        <h3>Fornitori di terze parti</h3>
        <p>I fornitori di terze parti, tra cui Google, utilizzano cookie per pubblicare annunci in base alle precedenti visite di un utente su questo sito.</p>
        <p>L'utilizzo dei cookie per la pubblicità consente a Google e ai suoi partner di pubblicare annunci per gli utenti di questo sito (e su altri siti) in base ai dati statistici raccolti su questo sito e sui siti web dei partner Google.</p>
        <p>Gli utenti possono scegliere di disattivare la pubblicità personalizzata, visitando la pagina <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Impostazioni annunci</a>.</p>
        <p>Visitando la pagina {config.appSiteUrl} potrai disattivare i cookies dei fornitori di terze parti.</p>
      </div>
      <div id="partners" style={{display: "none"}}>
        <h3>I nostri partner pubblicitari</h3>
        <p>Alcuni dei nostri partner pubblicitari possono utilizzare i cookies sul nostro sito per raccogliere dati sulla navigazione degli utenti in forma anonima. Tra i nostri partner pubblicitari figurano:</p>
        <ul>
          <li id="amazon" style={{display: "none"}}>Amazon</li>
          <li id="ebay" style={{display: "none"}}>Ebay</li>
          <li id="altri_partner" style={{display: "none"}}><span id="partner"></span></li>
        </ul>
        <p>Gli annunci dei fornitori terze parti gestiscono reti pubblicitarie che utilizzano la tecnologia dei cookies nei rispettivi annunci e nei link che appaiono sul nostro sito. Gli annunci vengono così inviati direttamente al tuo browser. Riceveranno automaticamente il tuo indirizzo IP. Altre tecnologie (come i cookie o JavaScript) possono anche essere utilizzati dalle reti pubblicitarie di terze parti del nostro sito per misurare l'efficacia delle loro campagne pubblicitarie e/o personalizzare i contenuti pubblicitari che vedete sul sito.</p>
        <p>Il nostro sito non ha accesso o non controlla questi cookie utilizzati da inserzionisti di terze parti.</p>
        <h3>Norme sulla privacy di terze parti</h3>
        <p>È necessario consultare le rispettive norme sulla privacy di questi server di terze parti per ulteriori informazioni sulle loro pratiche e per istruzioni su come disattivare alcune pratiche.</p>
        <p>La nostra politica sulla privacy non si applica ai fornitori di terze parti ed ai partner pubblicitari, e non possiamo controllare le attività di tali altri inserzionisti o siti web.</p>
        <p>Se desideri disattivare i cookie, puoi farlo attraverso le tue singole opzioni del browser. Ulteriori informazioni sulla gestione dei cookie con browser web specifico possono essere trovati nei rispettivi siti web dei browser</p>
      </div>
      <h3>Finalità del trattamento</h3>
      <p>I dati possono essere raccolti per una o più delle seguenti finalità:</p>
      <ul>
        <li>fornire l'accesso ad aree riservate del Portale e di Portali/siti collegati con il presente e all'invio di comunicazioni anche di carattere commerciale, notizie, aggiornamenti sulle iniziative di questo sito e delle società da essa controllate e/o collegate e/o Sponsor. </li>
        <li>eventuale cessione a terzi dei suddetti dati, sempre finalizzata alla realizzazione di campagne di email marketing ed all'invio di comunicazioni di carattere commerciale. </li>
        <li>eseguire gli obblighi previsti da leggi o regolamenti;</li>
        <li>gestione contatti;</li>
      </ul>
      <h3>Modalità del trattamento</h3>
      <p>I dati verranno trattati con le seguenti modalità:</p>
      <ul>
        <li>raccolta dati con modalità single-opt, in apposito database;</li>
        <li>registrazione ed elaborazione su supporto cartaceo e/o magnetico;</li>
        <li>organizzazione degli archivi in forma prevalentemente automatizzata, ai sensi del Disciplinare Tecnico in materia di misure minime di sicurezza, Allegato B del Codice della Privacy. </li>
      </ul>
      <h3>Natura obbligatoria</h3>
      <p>Tutti i dati richiesti sono obbligatori.</p>
      <div id="trattamento" style={{display: "none"}}>
        <h3>Soggetti a cui dati potranno essere comunicati i dati personali</h3>
        <p>I dati raccolti potranno essere comunicati a:</p>
        <ul>
          <li>società e imprese per usi di direct mailing o attività analoghe;</li>
          <li>associazioni e fondazioni intenzionate ad acquistare spazi pubblicitari sulle liste o sul sito e/o collegate alla fornitura di un particolare servizio.</li>
          <li>soggetti che debbano avere accesso ai dati, come da norme di legge o di normative secondarie e/o comunitarie.</li>
        </ul>
      </div>
      <h3>Diritti dell'interessato</h3>
      <p>Ai sensi ai sensi dell'art. 7 (Diritto di accesso ai dati personali ed altri diritti) del Codice della Privacy, vi segnaliamo che i vostri diritti in ordine al trattamento dei dati sono:</p>
      <ul>
        <li>conoscere, mediante accesso gratuito l'esistenza di trattamenti di dati che possano riguardarvi;</li>
        <li>essere informati sulla natura e sulle finalità del trattamento</li>
        <li>ottenere a cura del titolare, senza ritardo:</li>
        <ul>
          <li>la conferma dell'esistenza o meno di dati personali che vi riguardano, anche se non ancora registrati, e la comunicazione in forma intellegibile dei medesimi dati e della loro origine, nonché della logica e delle finalità su cui si basa il trattamento; la richiesta può essere rinnovata, salva l'esistenza di giustificati motivi, con intervallo non minore di novanta giorni;</li>
          <li>la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge, compresi quelli di cui non è necessaria la conservazione in relazione agli scopi per i quali i dati sono stati raccolti o successivamente trattati;</li>
          <li>l'aggiornamento, la rettifica ovvero, qualora vi abbia interesse, l'integrazione dei dati esistenti;</li>
          <li>opporvi in tutto o in parte per motivi legittimi al trattamento dei dati personali che vi riguardano ancorché pertinenti allo scopo della raccolta;</li>
        </ul>
      </ul>
      <p>Vi segnaliamo che il titolare del trattamento ad ogni effetto di legge è:</p>
      <ul>
        <li>Azienda di: <b><span id="azienda">{config.companyOwner}</span></b></li>
        <li id="piva" style={{display: "none"}}>P. IVA <span id="iva"></span></li>
        <li id="codiceFiscale" s_tyle={{display: "block"}}>Codice Fiscale: <span id="codice_Fiscale">{config.companyOwnerFiscalCode}</span></li>
        <li>Indirizzo: <span id="indirizzo">{config.companyOwnerStreetAddress}</span></li>
        <li>Città: <span id="cap">{config.companyOwnerZipCode}</span> - <span id="citta">{config.companyOwnerCity}</span> (<span id="provincia">{config.companyOwnerProvince}</span>)</li>
        <li>Tel/Fax: <span id="telefono">{config.companyOwnerPhone}</span></li>
        <li>E-mail: <span id="email">{config.companyOwnerEmail}</span></li>
      </ul>
      <p>Per esercitare i diritti previsti all'art. 7 del Codice della Privacy ovvero per la cancellazione dei vostri dati dall'archivio, è sufficiente contattarci attraverso uno dei canali messi a disposizione.</p>
      <p>Tutti i dati sono protetti attraverso l'uso di antivirus, firewall e protezione attraverso password.</p>
      <h3>Informazioni per i bambini</h3>
      <p>Riteniamo importante assicurare una protezione aggiunta ai bambini online. Noi incoraggiamo i genitori e i tutori a trascorrere del tempo online con i loro figli per osservare, partecipare e/o monitorare e guidare la loro attività online. Noi non raccogliamo dati personali di minori. Se un genitore o un tutore crede che il nostro sito abbia nel suo database le informazioni personali di un bambino, vi preghiamo di contattarci immediatamente (utilizzando la mail fornita) e faremo di tutto per rimuovere tali informazioni il più presto possibile.</p>
      <p>Questa politica sulla privacy si applica solo alle nostre attività online ed è valida per i visitatori del nostro sito web e per quanto riguarda le informazioni condivise e/o raccolte. Questa politica non si applica a qualsiasi informazione raccolta in modalità offline o tramite canali diversi da questo sito web.</p>
      <h3>Consenso</h3>
      <p>Usando il nostro sito web, acconsenti alla nostra politica sulla privacy e accetti i suoi termini. Se desideri ulteriori informazioni o hai domande sulla nostra politica sulla privacy non esitare a contattarci.</p>
    </>
  );

  return (
    <div className={classes.privacy}>
      <Trans t={t}>
        {contents}
        {contents_it} {/* TODO ... */}
      </Trans>
    </div>
  );
}