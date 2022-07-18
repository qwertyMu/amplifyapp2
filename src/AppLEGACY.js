import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react-v1';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, updateNote as updateNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '', location: '' }

function App() {
  const [notes, setNotes] = useState([]); // All the notes
  const [formData, setFormData] = useState(initialFormState); // New form data
  const [updatedFormData, setUpdatedFormData] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description || !formData.location) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  // async function updateNote( id ) {
  //   if (!updatedFormData.name || !updatedFormData.description || !updatedFormData.location) return;
  //   await API.graphql({ query: updateNoteMutation, variables: { input: updatedFormData } });
  //   setNotes([ ...notes, updatedFormData ]);
  // }

  async function updateNote( {id} ) {
    await API.graphql({ query: updateNoteMutation, variables: { input: id } });
    setNotes([ ...notes, formData ]);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  return (
    <div className="App">
      <h1>Scheduler</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Specialism"
        value={formData.description}
      />
      <input
        onChange={e => setFormData({ ...formData, 'location': e.target.value})}
        placeholder="Location"
        value={formData.location}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createNote}>Create Note</button>
      <br/>
      <hr/>
      <br/>
      <center>
        <table>
          <tbody>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Specialism</th>
              <th>Location</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {
              notes.map(note => (
                <tr key={note.id || note.name}>
                  <td>{note.image && <img src={note.image} style={{width: 100}} />}</td>
                  <td>{note.name}</td>
                  <td>
                    <input
                      onChange={e => setFormData({ ...formData.description, 'description': e.target.value})}
                      placeholder={note.description}
                      value={formData.description}
                    />
                  </td>
                  <td>{note.location}</td>
                  <td><button onClick={() => updateNote(note)}>Update</button></td>
                  <td><button onClick={() => deleteNote(note)}>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </center>
      <footer>
        <AmplifySignOut />
      </footer>
    </div>
  );
}

export default withAuthenticator(App);