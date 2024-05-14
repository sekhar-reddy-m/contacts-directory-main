import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get<Contact[]>('/api/contact');
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {contact.firstName} {contact.lastName} - {contact.email} - {contact.phone}
              <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
