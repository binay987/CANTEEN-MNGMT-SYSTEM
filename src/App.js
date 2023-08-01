import './App.css';
import HomePage from './components/HomePage/HomePage';
import { createBrowserRouter, createRoutesFromElements, Routes, RouterProvider, Route } from 'react-router-dom';
import Root from './components/RootLayout/Root';
import AdminPanel from './components/AdminPanel/AdminPanel'
import UserPanel from './components/UserPanel/UserPanel'

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/user" element={<UserPanel />} />
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
