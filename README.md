# idp-self-service-platform


Phase 1 backend API for an Internal Developer Platform.

## Folder Structure

```text
.
├── app.js
├── controllers/
│   └── serviceController.js
├── routes/
│   └── serviceRoutes.js
├── package.json
└── README.md
```

## Run

```bash
npm install
node app.js
```

## Endpoint

`POST /create-service`

Request body:

```json
{
	"serviceName": "string",
	"environment": "string"
}
```

Success response:

```json
{
	"status": "success",
	"message": "Service <serviceName> will be created in <environment>"
}
```

Validation error:

```json
{
	"status": "error",
	"message": "serviceName and environment are required"
}
```
