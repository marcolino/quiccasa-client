import React from "react";

export const capitalize = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const isEmptyObject = (obj) => {
  return (
    obj ? // null and undefined check
      Object.keys(obj).length === 0 // empty object check
      && obj.constructor === Object // Object.keys(new Date()).length === 0; so we have to check it is not a Date
    :
      true
  );
};

export const findValueInObjectsArrayByProp = (array, keyProp, valProp, value) => {
  const result = array.find(a => {
    return a[keyProp] === value;
  });
  return ((typeof result === "object") && (result !== null)) ? result[valProp] : undefined;
}

export const isAuthLocation = (location) => {
  return (
    (location.pathname === "/signup") ||
    (location.pathname === "/signin") ||
    (location.pathname === "/profile") ||
    (location.pathname === "/signout") ||
    (location.pathname === "/forgot-password")
  );
}

export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function currentFunctionName() {
  // TODO: remove this long version:
  // let name = arguments.callee.toString();
  // name = name.substr('function '.length);
  // name = name.substr(0, name.indexOf('('));
  // return name;

  // /* eslint-disable no-caller */
  // const name = arguments.callee.toString().substring(0, 'function '.length);
  // return name.substring(0, name.indexOf('('));

  const stack = new Error().stack,
        caller = stack.split('\n')[2].trim().replace(/at\s*/, "").replace(/Object\./, "");
  return caller;
};

export const encodeEmail = (email) => {
  var encodedEmail = "";
  
  if (!email) {
    return "";
  }

  for (let i = 0; i < email.length; i++) {
      var charNum = "000";
      var curChar = email.charAt(i);
      if (curChar === "A") {
        charNum = "065";
      }
      if (curChar === "a") {
        charNum = "097";
      }
      if (curChar === "B") {
        charNum = "066";
      }
      if (curChar === "b") {
        charNum = "098";
      }
      if (curChar === "C") {
        charNum = "067";
      }
      if (curChar === "c") {
        charNum = "099";
      }
      if (curChar === "D") {
        charNum = "068";
      }
      if (curChar === "d") {
        charNum = "100";
      }
      if (curChar === "E") {
        charNum = "069";
      }
      if (curChar === "e") {
        charNum = "101";
      }
      if (curChar === "F") {
        charNum = "070";
      }
      if (curChar === "f") {
        charNum = "102";
      }
      if (curChar === "G") {
        charNum = "071";
      }
      if (curChar === "g") {
        charNum = "103";
      }
      if (curChar === "H") {
        charNum = "072";
      }
      if (curChar === "h") {
        charNum = "104";
      }
      if (curChar === "I") {
        charNum = "073";
      }
      if (curChar === "i") {
        charNum = "105";
      }
      if (curChar === "J") {
        charNum = "074";
      }
      if (curChar === "j") {
        charNum = "106";
      }
      if (curChar === "K") {
        charNum = "075";
      }
      if (curChar === "k") {
        charNum = "107";
      }
      if (curChar === "L") {
        charNum = "076";
      }
      if (curChar === "l") {
        charNum = "108";
      }
      if (curChar === "M") {
        charNum = "077";
      }
      if (curChar === "m") {
        charNum = "109";
      }
      if (curChar === "N") {
        charNum = "078";
      }
      if (curChar === "n") {
        charNum = "110";
      }
      if (curChar === "O") {
        charNum = "079";
      }
      if (curChar === "o") {
        charNum = "111";
      }
      if (curChar === "P") {
        charNum = "080";
      }
      if (curChar === "p") {
        charNum = "112";
      }
      if (curChar === "Q") {
        charNum = "081";
      }
      if (curChar === "q") {
        charNum = "113";
      }
      if (curChar === "R") {
        charNum = "082";
      }
      if (curChar === "r") {
        charNum = "114";
      }
      if (curChar === "S") {
        charNum = "083";
      }
      if (curChar === "s") {
        charNum = "115";
      }
      if (curChar === "T") {
        charNum = "084";
      }
      if (curChar === "t") {
        charNum = "116";
      }
      if (curChar === "U") {
        charNum = "085";
      }
      if (curChar === "u") {
        charNum = "117";
      }
      if (curChar === "V") {
        charNum = "086";
      }
      if (curChar === "v") {
        charNum = "118";
      }
      if (curChar === "W") {
        charNum = "087";
      }
      if (curChar === "w") {
        charNum = "119";
      }
      if (curChar === "X") {
        charNum = "088";
      }
      if (curChar === "x") {
        charNum = "120";
      }
      if (curChar === "Y") {
        charNum = "089";
      }
      if (curChar === "y") {
        charNum = "121";
      }
      if (curChar === "Z") {
        charNum = "090";
      }
      if (curChar === "z") {
        charNum = "122";
      }
      if (curChar === "0") {
        charNum = "048";
      }
      if (curChar === "1") {
        charNum = "049";
      }
      if (curChar === "2") {
        charNum = "050";
      }
      if (curChar === "3") {
        charNum = "051";
      }
      if (curChar === "4") {
        charNum = "052";
      }
      if (curChar === "5") {
        charNum = "053";
      }
      if (curChar === "6") {
        charNum = "054";
      }
      if (curChar === "7") {
        charNum = "055";
      }
      if (curChar === "8") {
        charNum = "056";
      }
      if (curChar === "9") {
        charNum = "057";
      }
      if (curChar === "&") {
        charNum = "038";
      }
      if (curChar === " ") {
        charNum = "032";
      }
      if (curChar === "_") {
        charNum = "095";
      }
      if (curChar === "-") {
        charNum = "045";
      }
      if (curChar === "@") {
        charNum = "064";
      }
      if (curChar === ".") {
        charNum = "046";
      }
      if (charNum === "000") {
        encodedEmail += curChar;
      } else {
        encodedEmail += "&#" + charNum + ";";
      }
    }
    return React.createElement("span", { dangerouslySetInnerHTML: { __html: encodedEmail } });
  }
