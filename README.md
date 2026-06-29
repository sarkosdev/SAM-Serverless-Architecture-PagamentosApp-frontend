# SAM-Serverless-Architecture-PagamentosApp-frontend
Serverless Architecture for 'PagamentosApp' Frontend solution, AWS Amplify


## Description 

Pagamentos Application frontend service using Angular framework.
This frontend will be deployed using AWS Amplify, a Serverless solution when it comes to frontend

## Implementation

1. Create your Angular project 
    - `ng new pagamentos-app-frontend --routing --style=scss`

2. Install PrimeNG library 
    - `npm install primeng @primeuix/themes primeicons`

3. Create your componentes, and service that connects to our backend server

4. Now we need to configure our frontend deployment. And for that we need to create two files '/environments/environments.ts' for local development use and '/environments/environments.prod.ts' for production with AWS Amplify

5. Now we deploy the application to our AWS Amplify
    - Commit and push your code to your git repository
    - Go to AWS Console
        - AWS Amplify
        - Select Deploy an app
        - Select GitHub -> Next
        - Authenticate on your GitHub and select which repository you want to allow
        - Select repository 'sarkosdev/SAM-Serverless-Architecture-PagamentosApp-frontend' 
        - Select branch main
        - Amplify should detect our amplify.yml file for deployment
        - Deploy