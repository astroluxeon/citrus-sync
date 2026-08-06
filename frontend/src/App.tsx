import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import CreateEventForm from './CreateEventForm';
import EventPage from './EventPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEventForm />} />
        <Route path="/events/:id" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
