#!/usr/bin/env bash
#
# Send a push message to a registered clientd (identified by a valid token)

SERVER_KEY="AAAArl1xq6A:APA91bG9IExDRYr-6rKKIiX358_rz6hpuigqHI7wuII4no3Yq1uraVpr8ijb-ywMxPWyVWjceXi5ILcJdg5awab4i2aqTZ6ivUktL_ZYSd3qNapNA1qQsb0ZN8oPXDEdiKN_FwnNK2eN"
CONTENT_TYPE="application/json"
FIREBASE_ENDPOINT="https://fcm.googleapis.com/fcm/send"
#TO_TOKEN="ec0MeZXYkyNuap0lEEO_7G:APA91bE9UWJW-6mE1pPfhY_YtWQRPeLD3KmDifjATR5Es3QYFxpCxd7r5oidO7k7nNbzgb5RwsTmWgPKK-MXPGueQUe1Yq1zOi8qPKWo91yS5yCM7lT2XBU2zln_03EmyE8LU57upKmA"
TO_TOKEN="eUz-8yvPw30h8BNqvLpS8l:APA91bEA5ue7tn156JcSC-5hE5PClLTWzSZ1YeVOsnneLVnsNSoSOUB2KA9BdAkeUqjSNoWJkWmc5dUsgusi-AANZUJXo9AHkhcdg8Mmgvl8Vx4gEJ9YR4Jo_yyg8IqsORpkjyfdW8JP"


title="${2:-Titolo notifica push}"
body="${3:-Corpo notifica push}"
#icon="${4:-http://localhost:3000/static/media/LogoMain.e61b1d04.png}"
image="${4:-https://images.hqseek.com/pictures/pix02490a/pix-and-video-8.jpg}"
click_action="${5:-http://localhost:3000}"
tag="${6:-Tag 1}"
key1_value="${7:-key1 value}"
key2_value="${8:-key2 value}"
key3_value="${9:-key3 value}"

result=$(curl -X POST -H "Authorization: key=$SERVER_KEY" -H "Content-Type: $CONTENT_TYPE" -d "{
  \"to\": \"$TO_TOKEN\",
  \"notification\": {
    \"title\": \"$title\",
    \"body\": \"$body\",
    \"image\": \"$image\",
    \"click_action\": \"$click_action\",
    \"tag\": \"$tag\"
  },
  \"data\": {
    \"tag\": \"$tag in data\",
    \"key1\": \"$key1_value\",
    \"key2\": \"$key2_value\",
    \"key3\": \"$key3_value\",
  }
}" -s "$FIREBASE_ENDPOINT")
#echo $result
success=$(echo $result | jq -r '.success')
multicast_id=$(echo $result | jq -r '.multicast_id')
message_id=$(echo $result | jq -r '.results[].message_id')

echo "success: $success"
echo "multicast_id: $multicast_id"
echo "message_id: $message_id"