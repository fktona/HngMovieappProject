import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MovieSearched from './Components/MovieSearch'
import MovieDetails, {loadingMovieDetails} from './Components/MovieDetails'
import Homepage , {loadingTopMovie}from "./Components/Main"
import Header from "./Components/Header"
import './index.css'
import ErrorPage from "./Error";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
   children:[ 

     {
       path:"/",
       element:<Homepage/>,
       loader:loadingTopMovie,
     },
     {
       path: "movies",
       children:[ {
       path:":id",
      element:<MovieDetails/>,
       loader:loadingMovieDetails,
     }],
     },
      {
       path:"search",
       element:<MovieSearched />
     }]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <RouterProvider router={router} >
    <Routes />
    </RouterProvider  >
  </React.StrictMode>
)
