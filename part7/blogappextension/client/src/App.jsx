import { useState, useEffect, useRef } from "react";
import { Container, AppBar, Toolbar, Button } from "@mui/material";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";
import BadPath from "./components/BadPath";
import { useStoreActions, useBlogsListing, useKeptUsername } from "./store";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const App = () => {
  const blogs = useBlogsListing();
  const { setNotification, initialize, setUser, logOut } = useStoreActions()
  const loggedinUser = useKeptUsername()

  useEffect(() => {
    initialize();
  }, []);

  const padding = {
    padding: 5,
  };

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  return (
    <div>
      <Router>
        <Container>
          <Notification />

          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/" sx={style}>
                Blogs
              </Button>
              {!loggedinUser && (
                <Button color="inherit" component={Link} to="/login" sx={style}>
                  Login
                </Button>
              )}
              {loggedinUser && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/create"
                  sx={style}
                >
                  Create blog
                </Button>
              )}
              {loggedinUser && (
                <Button
                  color="inherit"
                  onClick={logOut}
                  to="/"
                  sx={style}
                >
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <BlogList
                    blogs={blogs}
                  />
                </ErrorBoundary>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <ErrorBoundary>
                  <Detail
                    blogs={blogs}
                  />
                </ErrorBoundary>
              }
            />
            {!loggedinUser && (
              <Route
                path="/login"
                element={
                  <ErrorBoundary>
                    <LoginForm/>
                  </ErrorBoundary>
                }
              />
            )}
            <Route
              path="/create"
              element={
                <ErrorBoundary>
                  <BlogForm
                    user={loggedinUser}
                  />
                </ErrorBoundary>
              }
            />
            <Route
              path="*"
              element={
                <ErrorBoundary>
                  <BadPath />
                </ErrorBoundary>
              }
            />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </div>
  );
};

export default App;
