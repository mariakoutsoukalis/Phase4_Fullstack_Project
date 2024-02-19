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
        element: <HomePage />
        
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
          const bookclubsDataResp = fetch('http://127.0.0.1:5000/bookclubs').then(response => response.json());


          // Use Promise.all to wait for all requests to complete
          const [data1] = await Promise.all([bookclubsDataResp]);

          // You can process the data as needed
          return { bookclubsData: data1 };
        }
      },
      {
        path: "/discussions/bybookclub/:id", // Use :id as a placeholder for the dynamic parameter
        element: <DiscussionPosts />,
        loader: async ({ params }) => {
          const { id } = params;

          // Modify the fetch URL to include the dynamic id parameter
          const allDiscussionsDataResp = fetch(`http://127.0.0.1:5000/discussions/bybookclub/${id}`).then(response => response.json());
          const allBooksDataResp = fetch(`http://127.0.0.1:5000/books/bybookclub/${id}`).then(response => response.json());


          // Use Promise.all to wait for all requests to complete
          const [data1, data2] = await Promise.all([allDiscussionsDataResp, allBooksDataResp]);

          // You can process the data as needed
          return { discussionPostsData: data1, allBooksData: data2 };
        }
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
