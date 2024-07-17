import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Page did not respond');
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = (field) => {
    const direction = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setUsers(sortedUsers);
    setSortOrder({ field, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('username')}>Username</th>
          <th onClick={() => handleSort('email')}>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
