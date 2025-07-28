 
const API_BASE = 'http://localhost:5000/api/users';

// Get all users
export const getAllUsers = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

// Get single user by ID
export const getUserById = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

// Create a new user
export const createUser = async (userData: any) => {
  console.log('Creating user with data:', userData);

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('Create failed:', error);
    throw new Error(error);
  }

  return res.json();
};

// Update an existing user
export const updateUser = async (id: number, userData: any) => {
  console.log(`Updating user ${id} with data:`, userData);

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('Update failed:', error);
    throw new Error(error);
  }

  return res.json();
};

// Delete a user
export const deleteUser = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('Delete failed:', error);
    throw new Error(error);
  }

  return res.json();
};
