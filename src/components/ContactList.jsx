export const ContactList = ({
  contacts = [],
  filter = '',
  onFilterChange,
  onDelete,
}) => {
  return (
    <div>
      <label>
        Find contact by name
        <input
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}{' '}
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
