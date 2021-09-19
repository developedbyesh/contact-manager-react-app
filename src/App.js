import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";

function App() {
  const LOCAL_STOTAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState([]);
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STOTAGE_KEY));
    if(retrieveContacts) setContacts(retrieveContacts);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STOTAGE_KEY, JSON.stringify(contacts));
  })
  // const contacts = [
  //   {
  //     id: '1',
  //     name: 'Imesh Gunasekara',
  //     email: 'imesh@gmail.com'
  //   },
  //   {
  //     id: '2',
  //     name: 'Telani Ranaweera',
  //     email: 'telani@gmail.com'
  //   },
  // ];
  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={ removeContactHandler } />
      <Footer />
    </div>
  );
}

export default App;
