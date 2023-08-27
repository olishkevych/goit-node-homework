import { Command } from "commander";
import contactsService from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log(allContacts);
      break;

    case "get":
      const selectedContact = await contactsService.getContactById(id);
      return console.log(selectedContact);
      break;

    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contactsService.removeContact(id);
      return console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
