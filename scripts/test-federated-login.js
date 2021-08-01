#!/usr/bin/env node
/**
 * Test federated signin endpoints
 *
 * Example: curl -vs 'https://auth.sistemisolari.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&client_id=67c2r6sh1fo6c85u819m9pir91&identity_provider=Google&scope=phone%20email%20profile%20Xopenid%20aws.cognito.signin.user.admin&state=I4SVmIKWDHPWoPgCfWvITysuRNCrTQVq&code_challenge=3SBg3vu3ktfzebAlV5MAtKfQ-wRFEUBdrkCFHxx8aUg&code_challenge_method=S256'
 */

require('dotenv').config();
const http = require("https");
const config = require("../src/config");

const redirect_uri = encodeURIComponent(config.oauthRedirectSignInPublic);
const response_type = "code";
const identity_provider = "Facebook";
const scope = encodeURIComponent("phone email profile openid aws.cognito.signin.user.admin");
const state = Math.random().toString(36);
const code_challenge = Math.random().toString(36);
const code_challenge_method = "S256";

const url = `
https://${config.oauth.domain}/oauth2/authorize?
redirect_uri=${redirect_uri}&
response_type=${response_type}&
client_id=${process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID}&
identity_provider=${identity_provider}&
scope=${scope}&
state=${state}&
code_challenge=${code_challenge}&
code_challenge_method=${code_challenge_method}
`;

http.get(url, function(response) {
  const response_location = response.headers.location
  const url = new URL(response_location);
  const redirect_uri = url.searchParams.get("redirect_uri");
  const error = url.searchParams.get("error");
  const error_message = url.searchParams.get("errorMessage");

  console.log("response location:", response_location);
  if (error || error_message) {
    console.log("ERROR");
    if (error) console.log("error:", error);
    if (error_message) console.log("error_message:", error_message);
  } else {
    console.log("SUCCESS");
    if (redirect_uri) console.log("redirect_uri:", redirect_uri);
  }

});
