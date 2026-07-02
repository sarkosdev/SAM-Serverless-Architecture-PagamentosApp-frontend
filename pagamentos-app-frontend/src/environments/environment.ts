export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:3000',
  cognito: {
    userPoolId: 'eu-west-1_F5XXmnvh3',
    userPoolClientId: '5l3glnavbt1v5qcgi2c5384gu4',
    domain: 'pagamentos-app-authenticator.auth.eu-west-1.amazoncognito.com',
    redirectSignIn: 'http://localhost:4200',
    redirectSignOut: 'http://localhost:4200'
  }
};