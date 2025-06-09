import React, { Component } from 'react';
import { Section } from './Section';
import { PhonebookInput } from './PhonebookInput';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;

    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert(`${name} is already in the phonebook.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  render() {
    const { contacts, name, number, filter } = this.state;
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes((filter || '').toLowerCase())
    );

    return (
      <div>
        <Section title="Phonebook">
          <PhonebookInput
            name={name}
            number={number}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </Section>
        <Section title="Contacts">
          <ContactList
            filter={filter}
            onFilterChange={this.handleFilterChange}
            contacts={visibleContacts}
            onDelete={this.handleDelete}
          />
        </Section>
      </div>
    );
  }
}
