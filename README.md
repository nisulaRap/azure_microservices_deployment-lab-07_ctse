# CTSE Lab 07 - Azure Microservices Deployment

## Project Structure

- gateway/: Node.js gateway service
- frontend/: Frontend UI with Node.js proxy server
- deployment-values.env: Azure deployment variables
- Lab_07_Azure_microservices_lab.pdf: Lab sheet

## Prerequisites

- Node.js 18+
- npm 9+
- Azure CLI (for cloud verification steps)

## Install

From project root:

```powershell
npm install
npm run install:all
```

## Run Locally

Start both services from project root:

```powershell
npm run dev
```

Default ports:

- Gateway: http://localhost:3000
- Frontend: http://localhost:5500

## Test Locally

Run in a new terminal:

```powershell
Invoke-RestMethod http://localhost:3000/health
Invoke-RestMethod http://localhost:5500/config
Invoke-RestMethod http://localhost:5500/health
```

Then open:

- http://localhost:5500/

Click "Check Gateway Health".

## Important Notes

- Do not run `python -m http.server` for frontend integration testing.
- Use Node frontend server (`npm --prefix frontend start`) so `/config` and `/health` routes work.
- If you get `EADDRINUSE`, free ports 3000/5500 or run frontend on another port.

## Frontend Only (Optional)

```powershell
npm --prefix frontend start
```

Custom frontend port:

```powershell
$env:FRONTEND_PORT="5600"
npm --prefix frontend start
```

## Azure Gateway Quick Check

```powershell
az containerapp show -n gateway -g microservices-rg --query properties.provisioningState -o tsv
az containerapp show -n gateway -g microservices-rg --query properties.configuration.ingress.fqdn -o tsv
az containerapp logs show -n gateway -g microservices-rg --tail 100
```
