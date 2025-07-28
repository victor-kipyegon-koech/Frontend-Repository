const API_BASE = 'http://localhost:5000/api/venues';

export const getAllVenues = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch venues');
  return res.json();
};

export const getVenueById = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch venue');
  return res.json();
};

export const createVenue = async (venueData: any) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venueData),
  });
  if (!res.ok) throw new Error('Failed to create venue');
  return res.json();
};

export const updateVenue = async (id: number, updatedData: any) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update venue');
  return res.json();
};

export const deleteVenue = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete venue');
  return res.json();
};
