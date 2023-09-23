import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MovieSearched from "./Components/MovieSearch";
import Trending from "./Components/Trending";
import Upcoming from "./Components/upcoming";
import Genre from "./Components/Genre";
import Favorite from "./Components/Favorite";
import MovieDetails, { loadingMovieDetails } from "./Components/MovieDetails";
import Homepage, { loadingTopMovie } from "./Components/Main";
import Header from "./Components/Header";
import "./index.css";
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
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: loadingTopMovie,
      },
      {
        path: "Upcoming",
        element: <Upcoming />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "genre",
        element: <Genre />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "movies",
        children: [
          {
            path: ":id",
            element: <MovieDetails />,
            loader: loadingMovieDetails,
          },
        ],
      },
      {
        path: "search",
        element: <MovieSearched />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Routes />
    </RouterProvider>
  </React.StrictMode>,
);
