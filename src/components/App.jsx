import { useEffect, useState } from 'react';
import { Section } from './Section';
import { PhonebookInput } from './PhonebookInput';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList';

export const App = () => {
  const [state, setState] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return {
      contacts: savedContacts ? JSON.parse(savedContacts) : [],
      name: '',
      number: '',
      filter: '',
    };
  });
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const nameExists = state.contacts.some(
      contact => contact.name.toLowerCase() === state.name.toLowerCase()
    );

    if (nameExists) {
      alert(`${state.name} is already in the phonebook.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: state.name,
      number: state.number,
    };
    setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };
  const handleDelete = id => {
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  const handleFilterChange = evt => {
    setState(prevState => ({
      ...prevState,
      filter: evt.target.value,
    }));
  };

  const visibleContacts = state.contacts.filter(contact =>
    contact.name.toLowerCase().includes((state.filter || '').toLowerCase())
  );
  return (
    <div>
      <Section title="Phonebook">
        <PhonebookInput
          name={state.name}
          number={state.number}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Section>
      <Section title="Contacts">
        <ContactList
          filter={state.filter}
          onFilterChange={handleFilterChange}
          contacts={visibleContacts}
          onDelete={handleDelete}
        />
      </Section>
    </div>
  );
};
