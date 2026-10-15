# Contacts API

A REST API for managing contacts (name, email, phone), built with Node.js and Express.
Builds on task-api by adding query-parameter filtering and pagination.

## Setup
```bash
npm install
```

## Run
```bash
npm start
```
or, to auto-restart on every save:
```bash
npm run dev
```

Runs at `http://localhost:3001` (different port than task-api, so both can run together).

## Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|----------------------------------------|
| GET    | /contacts         | List contacts (supports ?search= and ?page=&limit=) |
| GET    | /contacts/:id     | Get one contact by id                  |
| POST   | /contacts         | Create a new contact                   |
| PATCH  | /contacts/:id     | Update a contact                       |
| DELETE | /contacts/:id     | Delete a contact                       |

## Example requests (PowerShell / Invoke-RestMethod)

List all:
```powershell
Invoke-RestMethod -Uri http://localhost:3001/contacts
```

Search by name/email:
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/contacts?search=omar"
```

Paginate (page 1, 2 per page):
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/contacts?page=1&limit=2"
```

Create a contact:
```powershell
Invoke-RestMethod -Uri http://localhost:3001/contacts -Method Post -ContentType "application/json" -Body '{"name":"Yara Saleh","email":"yara@example.com","phone":"0794444444"}'
```

Update a contact:
```powershell
Invoke-RestMethod -Uri http://localhost:3001/contacts/1 -Method Patch -ContentType "application/json" -Body '{"phone":"0790000000"}'
```

Delete a contact:
```powershell
Invoke-RestMethod -Uri http://localhost:3001/contacts/1 -Method Delete
```