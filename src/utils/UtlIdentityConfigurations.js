export const IDENTITY_CONFIGURATION = {
  // authority: SERVER_ADDRESSES.pmonidentity,
  client_id: 'pmon',
  // redirect_uri: SERVER_ADDRESSES.spa + '/callback',
  // silent_redirect_uri: SERVER_ADDRESSES.spa + '/silentrenew',
  // post_logout_redirect_uri: SERVER_ADDRESSES.spa + '/logout/callback',
  // audience: 'pmon',
  grant_type: 'password',
  // automaticSilentRenew: true,
  // loadUserInfo: true,
  scope: 'openid profile pmonapi'
};
