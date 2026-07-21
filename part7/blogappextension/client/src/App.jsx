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
import Register from "./components/Register";
import UserList from "./components/UserList";
import { useStoreActions, useKeptUsername } from "./store";

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import DetailUser from "./components/DetailUser";

const App = () => {
  const { initialize, logOut } = useStoreActions();
  const loggedinUser = useKeptUsername();
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  const padding = {
    padding: 5,
  };

  const logOutHandler = async (event) => {
    const success = await logOut();

    if (success) {
      navigate("/");
    }
  };

  
  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  return (
    <div>
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
              {!loggedinUser && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={style}
                >
                  Register
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
                  component={Link}
                  to="/users"
                  sx={style}
                >
                  Users
                </Button>
              )}
              {loggedinUser && (
                <Button color="inherit" onClick={logOutHandler} to="/" sx={style}>
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
                  <BlogList />
                </ErrorBoundary>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <ErrorBoundary>
                  <Detail />
                </ErrorBoundary>
              }
            />
            <Route
              path="/users/:id"
              element={
                <ErrorBoundary>
                  <DetailUser />
                </ErrorBoundary>
              }
            />
            {!loggedinUser && (
              <Route
                path="/login"
                element={
                  <ErrorBoundary>
                    <LoginForm />
                  </ErrorBoundary>
                }
              />
            )}
            {loggedinUser && (
              <Route
                path="/create"
                element={
                  <ErrorBoundary>
                    <BlogForm user={loggedinUser} />
                  </ErrorBoundary>
                }
              />
            )}
            <Route
              path="/register"
              element={
                <ErrorBoundary>
                  <Register />
                </ErrorBoundary>
              }
            />
            {loggedinUser && (
              <Route
                path="/users"
                element={
                  <ErrorBoundary>
                    <UserList />
                  </ErrorBoundary>
                }
              />
            )}
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
    </div>
  );
};

export default App;
