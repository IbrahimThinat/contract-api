/**
 * Contacts API — manages a list of contacts (name, email, phone).
 *
 * Run it with:
 *   npm install
 *   npm start        (or: npm run dev   -- auto-restarts on save)
 *
 * Base URL: http://localhost:3001
 * (different port than task-api, so you can run both at the same time)
 */

const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

// In-memory storage. Resets every time the server restarts.
let contacts = [
  { id: 1, name: "Sara Ahmad", email: "sara@example.com", phone: "0791111111" },
  { id: 2, name: "Omar Khalil", email: "omar@example.com", phone: "0792222222" },
  { id: 3, name: "Lina Youssef", email: "lina@example.com", phone: "0793333333" },
];
let nextId = 4;

// ---------- Routes ----------

// READ — list all contacts, with optional search + pagination
// Examples:
//   GET /contacts
//   GET /contacts?search=omar
//   GET /contacts?page=1&limit=2
app.get("/contacts", (req, res) => {
  let result = contacts;

  const { search, page, limit } = req.query;

  // Filtering (query parameter)
  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
    );
  }

  // Pagination (query parameters)
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || result.length || 1;
  const start = (pageNum - 1) * limitNum;
  const paged = result.slice(start, start + limitNum);

  res.json({
    total: result.length,
    page: pageNum,
    limit: limitNum,
    contacts: paged,
  });
});

// READ — get one contact by id
app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === Number(req.params.id));
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.json(contact);
});

// CREATE — add a new contact
app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required and must be a string" });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "a valid email is required" });
  }

  const contact = { id: nextId++, name, email, phone: phone || null };
  contacts.push(contact);
  res.status(201).json(contact);
});

// UPDATE — change one or more fields of a contact
app.patch("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === Number(req.params.id));
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const { name, email, phone } = req.body;
  if (name !== undefined) contact.name = name;
  if (email !== undefined) contact.email = email;
  if (phone !== undefined) contact.phone = phone;

  res.json(contact);
});

// DELETE — remove a contact
app.delete("/contacts/:id", (req, res) => {
  const index = contacts.findIndex((c) => c.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const removed = contacts.splice(index, 1)[0];
  res.json({ message: "Contact deleted", contact: removed });
});

app.listen(PORT, () => {
  console.log(`Contacts API running at http://localhost:${PORT}`);
});