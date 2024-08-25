"use client"
import { useState } from 'react';
import axios from 'axios';

const IncidentForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/incident', { name, description,address });
      setMessage(response.data.message);
      setName('');
      setDescription('');
      setAddress('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setMessage('Error creating incident.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name of Informer</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>
     
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Incident
        </button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '20px', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default IncidentForm;
