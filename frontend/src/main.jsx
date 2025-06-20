import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage } from './pages/EventPage';
import { EventsPage } from './pages/EventsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { LoginPage } from './pages/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";
import SignupForm from './components/SignupForm';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <ProtectedRoute />, // Wrap protected routes
        children: [
          { path: '/', element: <EventsPage /> },
          { path: '/events', element: <EventsPage /> },
          { path: '/event/:eventId', element: <EventPage /> },
        ],
      },
      { 
        path: '/login', 
        element: (
          <>
            <LoginPage />
            <SignupForm />
          </>
        ) 
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
  
  </React.StrictMode>
);
