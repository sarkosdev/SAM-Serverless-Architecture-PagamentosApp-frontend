# Pagamentos Application - Frontend

Angular 20 frontend for the Serverless Payments Application, deployed on AWS Amplify and secured using Amazon Cognito.

---

# Project Overview

The **Pagamentos Application Frontend** is a Single Page Application (SPA) responsible for providing the user interface for the serverless backend (https://github.com/sarkosdev/SAM-Serverless-Architecture-PagamentosApp.git).

The application communicates exclusively with the backend REST API exposed through **Amazon API Gateway** Service.

Authentication is delegated to **Amazon Cognito Hosted UI**, while authorization is enforced by **Amazon API Gateway** through JWT tokens automatically attached to every protected API request.

The frontend was intentionally designed to remain lightweight and stateless, allowing AWS managed services to handle authentication, hosting and scalability.

---

## Main Features

- Single Page Application (SPA)
- Secure authentication using Amazon Cognito
- OAuth2 Authorization Code Flow + PKCE
- Automatic JWT handling
- Responsive user interface
- Production deployment using AWS Amplify
- Environment-based API configuration
- Automatic CI/CD deployments with AWS Amplify

## Why Angular?

Angular was selected as the frontend framework because it provides a complete ecosystem for building enterprise-grade web applications.

Some of the reasons for this decision include:

- Component-based architecture
- Dependency Injection
- Built-in Routing
- RxJS reactive programming
- TypeScript support
- Excellent scalability
- Long-term support by Google

Angular is widely adopted across enterprise environments, making it an excellent choice for applications expected to grow over time, which might be our case, and is allways a good practice choice.


## Why PrimeNG?

Instead of creating every UI component from scratch, the project uses PrimeNG library.

PrimeNG provides a rich collection of production-ready Angular components that significantly reduce development time while maintaining a professional user experience.

Examples include:

- Tables
- Buttons
- Dialogs
- Toast notifications
- Input controls
- Cards
- Toolbars

Using a mature UI component library also improves accessibility, consistency and maintainability.

## Why AWS Amplify?

AWS Amplify Hosting was selected as the deployment platform because it integrates naturally with modern frontend frameworks.

Compared with manually hosting an Angular application inside an EC2 instance or S3 bucket, Amplify provides:

- Managed hosting
- HTTPS by default
- Global CDN
- Automatic deployments
- Branch-based deployments
- Rollback support
- Build logs
- GitHub integration

Every push to the `main` branch automatically generates a new production deployment.

No manual deployment steps are required.


---

# Local Development


## Prerequisites

- Node
- npm
- Angular CLI 

Install dependencies

```bash
npm install
```

Run frontend application

```bash
ng serve
```

Open

http://localhost:4200


---

# Production Build

The frontend is built using the Angular production build configuration.

During the build process, Angular compiles the application, performs Ahead-of-Time (AOT) compilation, optimizes JavaScript bundles, removes development-only code and generates static assets ready to be deployed.

The generated files are stored under:

```text
dist/pagamentos-app-frontend/browser
```

This directory is used by AWS Amplify as the deployment artifact.

---

## Building the Application

To generate a production build, run:

```bash
ng build
```

or

```bash
npm run build
```

Once the build completes successfully, Angular generates the optimized production artifacts inside the `dist/` directory, which are the files that will be deployed using AWS Amplify.

Angular 20 uses the new applicaton builder introduced by Angular CLI, this builder prepares the project for both client-side rendering and optional server-side rendering (SSR). Even though this project is deployed as a traditional Single Page Application (SPA), the generated output is placed inside the `browser/` directory and AWS Amplify is configured to use this directory as the deployment artifact.

---

## Production Optimizations

Angular automatically applies several optimizations during the production build, including:

- Ahead-of-Time (AOT) compilation
- JavaScript minification
- CSS optimization
- Tree shaking
- Dead code elimination
- Bundle optimization
- Production environment configuration

These optimizations reduce the application size and improve loading performance.

---

## Deployment Artifact

AWS Amplify is configured to deploy the following directory:

```text
dist/pagamentos-app-frontend/browser
```

This path is configured inside the project's `amplify.yml` file.

After a successful build, the generated static files are automatically uploaded and served by AWS Amplify Hosting.


---

# Environment Configuration

The frontend uses Angular environment files to separate local development settings from production settings.

This allows the same application codebase to communicate with different backend endpoints and Cognito callback URLs depending on the active build configuration.

No secrets are stored in these files. Values such as API Gateway URLs, Cognito User Pool IDs and App Client IDs are public configuration values used by the browser application.

---

## Environment Files

The project uses two environment files:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

The development environment is used when running:

```bash
ng serve
```

The production environment is used when running:

```bash
ng build --configuration production
```

Angular replaces the development environment file with the production version during the production build.

This replacement is configured in `angular.json`.

---

## Development Environment

The local environment uses the Angular development server and forwards backend requests through the local proxy configuration.

Example:

```typescript
export const environment = {
  production: false,

  apiBaseUrl: '',

  cognito: {
    userPoolId: 'eu-west-1_EXAMPLE',
    userPoolClientId: 'exampleclientid',
    domain: 'pagamentos-app-authenticator.auth.eu-west-1.amazoncognito.com',
    redirectSignIn: 'http://localhost:4200',
    redirectSignOut: 'http://localhost:4200'
  }
};
```

The empty `apiBaseUrl` is intentional.

When the application calls:

```text
/pagamentos
```

the Angular development server forwards the request to the local SAM API using `proxy.conf.json`.

This avoids hardcoding the local backend URL in the application code.

---

## Local Proxy Configuration

The project uses `proxy.conf.json` to forward API requests from the Angular development server to the local SAM backend.

Example:

```json
{
  "/pagamentos": {
    "target": "http://127.0.0.1:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/pagamentos/**": {
    "target": "http://127.0.0.1:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

The frontend is started with:

```bash
ng serve --proxy-config proxy.conf.json
```

or through the configured npm script:

```bash
npm start
```

The browser sends requests to:

```text
http://localhost:4200/pagamentos
```

The Angular development server then forwards them to:

```text
http://127.0.0.1:3000/pagamentos
```

---

## Production Environment

The production environment points directly to the deployed API Gateway endpoint and uses the AWS Amplify domain as the Cognito redirect URL.

Example:

```typescript
export const environment = {
  production: true,

  apiBaseUrl: 'https://ovnl8uw0ff.execute-api.eu-west-1.amazonaws.com',

  cognito: {
    userPoolId: 'eu-west-1_EXAMPLE',
    userPoolClientId: 'exampleclientid',
    domain: 'pagamentos-app-authenticator.auth.eu-west-1.amazoncognito.com',
    redirectSignIn: 'https://main.d3at3wpexagb3r.amplifyapp.com',
    redirectSignOut: 'https://main.d3at3wpexagb3r.amplifyapp.com'
  }
};
```

The `apiBaseUrl` must not include a trailing slash.

The frontend service appends the API resource path:

```typescript
private readonly baseUrl =
  environment.apiBaseUrl.replace(/\/+$/, '');

private readonly apiUrl =
  `${this.baseUrl}/pagamentos`;
```

This prevents malformed URLs, for example:

```text
https://api-id.execute-api.eu-west-1.amazonaws.com//pagamentos
```

---

## Cognito Redirect URLs

Amazon Cognito requires every valid login and logout destination to be explicitly configured in the Cognito App Client.

The backend infrastructure currently allows, this ensure Cognito works perfectly on both local and prodution environment:

```text
http://localhost:4200
https://main.d3at3wpexagb3r.amplifyapp.com
```

The frontend environment configuration must match those URLs exactly.

Differences such as an additional trailing slash, a different protocol or a different Amplify application domain will cause the Cognito redirect flow to fail.

Correct:

```text
https://main.d3at3wpexagb3r.amplifyapp.com
```

Incorrect:

```text
https://main.d3at3wpexagb3r.amplifyapp.com/
```

---

## Configuration Security

Frontend environment files are bundled into the application JavaScript and are visible to the browser.

For that reason, they must never contain secrets such as, for that you can use AWS Secret Manager Service, for example, and never expose the following:

- AWS access keys
- AWS secret keys
- Cognito App Client secrets
- Database credentials
- Private API keys

The following values are safe to expose in a frontend application:

- API Gateway URL
- Cognito User Pool ID
- Cognito App Client ID
- Cognito domain
- Redirect URLs

The Cognito App Client is configured without a client secret because Angular is a public browser client and cannot securely protect secrets.

---

# API Integration

The frontend communicates exclusively with the backend REST API exposed through **Amazon API Gateway**.

All business operations are performed by consuming HTTP endpoints provided by the backend serverless application.

The frontend never communicates directly with AWS Lambda functions or Amazon DynamoDB.

Every request follows the flow below:

```text
Angular Component
        │
        ▼
Application Service
        │
        ▼
Angular HttpClient
        │
        ▼
HTTP Interceptor
        │
 Authorization: Bearer <JWT>
        │
        ▼
Amazon API Gateway
        │
        ▼
AWS Lambda
        │
        ▼
Amazon DynamoDB
```

This layered approach keeps UI components independent from networking concerns and centralizes HTTP communication inside dedicated Angular services.

---

## Angular Services

Each business capability is implemented through Angular services.

Components never communicate directly with the backend.

Instead, they delegate every HTTP operation to a service responsible for interacting with the REST API.

This provides several advantages:

- Better separation of responsibilities
- Reusable business logic
- Easier testing
- Cleaner components
- Centralized API communication

---

## HTTP Communication

The application uses Angular's built-in **HttpClient** module.

All requests are performed asynchronously using **RxJS Observables**.

Typical operations include:

- Retrieve all payments
- Retrieve payments by status
- Create a payment
- Process pending payments
- Delete a payment

Each service returns strongly typed models, allowing Angular components to remain independent from the raw HTTP responses.

---

## Authentication

Protected endpoints require a valid JWT Access Token.

Authentication is completely transparent to the application components.

The HTTP Interceptor automatically:

- Retrieves the current Access Token
- Adds the `Authorization` header
- Sends the authenticated request

Example:

```http
GET /pagamentos HTTP/1.1
Authorization: Bearer eyJhbGciOi...
```

Because authentication is handled centrally by the interceptor, application services never need to manually manage JWT tokens, this increases security, defines responsability and reduce costs.

---

## Development Environment

During local development, requests are forwarded through Angular's development proxy.

```text
Angular

↓

http://localhost:4200/pagamentos

↓

proxy.conf.json

↓

SAM Local

↓

http://127.0.0.1:3000/pagamentos
```

This avoids CORS issues during development while allowing the frontend to use relative API paths.

---

## Production Environment

In production, the frontend communicates directly with Amazon API Gateway.

```text
Angular (AWS Amplify)

↓

HTTPS

↓

Amazon API Gateway

↓

AWS Lambda
```

The production API endpoint is configured through the Angular production environment.

Example:

```text
https://<api-id>.execute-api.eu-west-1.amazonaws.com
```

This endpoint is automatically used during the production build executed by AWS Amplify.

---

## Error Handling

HTTP errors are handled centrally inside the application, as they should.

Typical scenarios include:

| HTTP Status | Description |
|------------:|-------------|
| 400 | Invalid request payload |
| 401 | User is not authenticated |
| 403 | User is authenticated but not authorized |
| 404 | Requested resource does not exist |
| 500 | Unexpected backend error |

The frontend translates these responses into user-friendly notifications, keeping backend implementation details hidden from the end user.

---

## Why this Design?

Separating the UI from the communication layer provides several architectural benefits, such as:

- Components remain focused on presentation
- API communication is centralized
- Authentication logic is implemented once
- Services are reusable
- Backend endpoints can evolve with minimal impact on the UI

This architecture follows Angular's recommended application design patterns and promotes maintainable, scalable frontend applications.


---

# Security

Although the frontend is a public Single Page Application (SPA), it has been designed following modern web security practices.

The frontend never performs authorization decisions itself. Its responsibility is limited to obtaining valid access tokens and attaching them to outgoing API requests.

---

## Authentication

User authentication is implemented using **Amazon Cognito Hosted UI** and the **OAuth2 Authorization Code Flow with PKCE**.

This approach provides several advantages over implementing authentication directly inside the application:

- No password handling in the frontend
- Secure authentication managed by Amazon Cognito
- Industry-standard OAuth2 implementation
- Automatic JWT generation
- Built-in session management

The application redirects users to the Cognito Hosted UI whenever authentication is required.

After a successful login, Cognito redirects the user back to the Angular application with an Authorization Code, which is exchanged for JWT tokens.

---

## JWT Access Tokens

Every protected backend request requires a valid JWT Access Token.

The frontend does not manually add authentication headers.

Instead, a dedicated **HTTP Interceptor** automatically:

- Retrieves the current Access Token
- Adds the `Authorization` header
- Sends the authenticated request

Example:

```http
Authorization: Bearer eyJhbGciOi...
```

This centralizes authentication logic and prevents components from managing security concerns.

---

## Authorization

Authorization is **not implemented inside the Angular application**.

Every authorization decision is delegated to the backend.

When a request reaches Amazon API Gateway:

1. The JWT token is validated.
2. Invalid or expired tokens are rejected immediately.
3. Only authenticated requests reach the Lambda functions.

This design reduces unnecessary Lambda executions, lowers operational costs and improves the application's security posture.

---

## HTTPS Communication

All communication between the frontend and backend is performed over HTTPS.

This includes:

- Browser ↔ AWS Amplify
- Browser ↔ Amazon Cognito
- Browser ↔ Amazon API Gateway

HTTPS protects the confidentiality and integrity of all transmitted data.

---

## No Client Secrets

The Angular application is considered a **public client**.

For this reason, no secrets are embedded inside the frontend source code.

The application never stores:

- AWS Access Keys
- AWS Secret Keys
- Cognito Client Secrets
- Database credentials
- Private API keys

Only public configuration values are included, such as:

- API Gateway endpoint
- Cognito User Pool ID
- Cognito App Client ID
- Cognito Hosted UI domain

This follows AWS recommendations for browser-based applications.

---

## Security Responsibilities

The overall security model is intentionally divided between frontend and backend.

| Frontend | Backend |
|----------|----------|
| Redirect users to Cognito | Validate JWT tokens |
| Obtain OAuth2 tokens | Authorize requests |
| Attach JWT tokens to requests | Protect API endpoints |
| Handle login/logout | Execute business logic |
| Display authentication state | Enforce access control |

This separation keeps the frontend lightweight while allowing the backend to remain the single source of truth for authorization decisions.

---

## Security Summary

The frontend follows modern security practices by:

- Delegating authentication to Amazon Cognito
- Using OAuth2 Authorization Code Flow with PKCE
- Automatically attaching JWT tokens through an HTTP Interceptor
- Communicating exclusively over HTTPS
- Never exposing secrets in the client application
- Delegating authorization to Amazon API Gateway

By relying on managed AWS security services rather than custom authentication code, the application remains simpler to maintain while benefiting from AWS security best practices.

---

# Related Projects

This repository contains the frontend application for the Serverless Pagamentos Application.

The backend implementation is available in the following repository:

- **Backend:** [SAM-Serverless-Architecture-PagamentosApp](https://github.com/sarkosdev/SAM-Serverless-Architecture-PagamentosApp)

Together, both repositories demonstrate the implementation of a complete cloud-native serverless application built on AWS using modern frontend and backend technologies and AWS resources and best pratices.

---

## License

This project is intended for learning, portfolio and architectural demonstration purposes.

**Nuno Cruz, 07/09/2026**