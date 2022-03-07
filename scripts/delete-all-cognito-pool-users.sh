#!/usr/bin/env bash
#
# Delete all users for a Cognito User Pool

USER_POOL_ID="${1:-eu-west-1_edKzSSeU9}"

if [ -z "USER_POOL_ID" ]; then
  echo "Please specify a Cognito User Pool Identifier"
  exit 1
fi

read -p "Are you really sure you want to permanently delete ALL users for Cognito User Pool ${USER_POOL_ID} [y/N] ? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  exitval=0
  users=`aws cognito-idp list-users --user-pool-id "${USER_POOL_ID}" | grep Username | awk -F: '{print $2}' | sed -e 's/\"//g' | sed -e 's/,//g'`
  for user in $users; do
    aws cognito-idp admin-delete-user --user-pool-id "${USER_POOL_ID}" --username "${user}"
    errno=$?
    if [ $errno -eq 0 ]; then
      echo "User $user deleted"
    else
      echo "Could not delete user $user ($errno)"
      exitval=2
    fi
  done
fi

exit $exitval