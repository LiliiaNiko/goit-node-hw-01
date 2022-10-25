const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  console.table(contacts);
}

async function getContactById(contactId) {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  const contact = contacts.find((item) => {
    if (item.id === contactId) {
      console.table(item);
      return item;
    }
  });
}

async function removeContact(contactId) {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  const newContacts = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.table(newContacts);
}

async function addContact(name, email, phone) {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  contacts.push({
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  });
  console.table(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
