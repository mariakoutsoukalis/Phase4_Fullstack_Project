/*

Core Deliverables
1. Install React Router (a project requirement) and Tailwind CSS (an optional approach to styling).
2. Create a root layout and two nested routes.
   a. Add a <nav> to the root and render the other routes in an outlet.
3. Handle errors with a custom component.
4. GET resources from your backend, and hold them in state.
5. Pass props down to a form with controlled inputs.
   a. On submit, POST to your backend, and update state.
*/

// Create React App
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// Tailwind CSS (along with ../tailwind.config.js)
import "./index.css";
// React Router
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
// Routes & Error Handling
// Note: By convention, routes are named `routes/[slug].jsx`.
import Error from './error';
import Root from "./routes/root";
import HomePage from './HomePage';
import AddPlaces from './routes/AddPlaces';
import About from './routes/about';
import BookClub from './routes/BookClub';
import DiscussionPosts from './DiscussionPosts';


const router = createBrowserRouter([
  {
    // Render <Root> at [URL].
    path: "/",
    element: <Root />,
    // Render <Error> when errors occur.
    errorElement: <Error />,
    // Render these children in the root's outlet when...
    children: [
      {
        // ...the user visits [URL].
        path: "/",
        element: <HomePage />,
       
        loader: async () => {
          const recommendedDataResp = fetch("http://localhost:3000/recommended").then(response => response.json());
          const outdoorsDataResp = fetch("http://localhost:3000/outdoors").then(response => response.json());
          const museumDataResp = fetch("http://localhost:3000/museums").then(response => response.json());
          const entertainmentDataResp = fetch("http://localhost:3000/entertainment").then(response => response.json());
        
          // Use Promise.all to wait for all requests to complete
          const [data1, data2, data3, data4] = await Promise.all([recommendedDataResp, outdoorsDataResp, museumDataResp, entertainmentDataResp]);
        
          // You can process the data as needed
          return { recommendedData: data1, outdoorsData: data2, museumData: data3, entertainmentData: data4 };
        }
        
      },
      {
        // ...the user visits [URL].
        path: "add",
        element: <AddPlaces />,
        loader: async () => {
        
          const outdoorsDataResp = fetch("http://localhost:3000/outdoors").then(response => response.json());
          const museumDataResp = fetch("http://localhost:3000/museums").then(response => response.json());
          const entertainmentDataResp = fetch("http://localhost:3000/entertainment").then(response => response.json());
        
          // Use Promise.all to wait for all requests to complete
          const [data1, data2, data3] = await Promise.all([outdoorsDataResp, museumDataResp, entertainmentDataResp]);
        
          // You can process the data as needed
          return { outdoorsData: data1, museumData: data2, entertainmentData: data3 };
        }
        
      },
      {
        // ...the user visits [URL]/about.
        path: "about",
        element: <About />
      },
      {
        // ...the user visits [URL]/about.
        path: "bookclub",
        element: <BookClub />,
        loader: async () => {
          const bookclubsDataResp = fetch("/bookclubs").then(response => response.json());
         
        
          // Use Promise.all to wait for all requests to complete
          const [data1] = await Promise.all([bookclubsDataResp]);
        
          // You can process the data as needed
          return { bookclubsData: data1};
        }
      },
      {
        // ...the user visits [URL]/about.
        path: "/discussion-posts",
        element: <DiscussionPosts />
      }

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
// Replacing <App> with <RouterProvider> injects our routes into index.html.
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
