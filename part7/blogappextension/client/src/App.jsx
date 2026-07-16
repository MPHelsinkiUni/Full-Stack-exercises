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
import { useStoreActions, useBlogsListing } from "./store";

import blogService from "./services/blogs";
import loginService from "./services/login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const blogs = useBlogsListing();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setNotification, initialize, setBlogs } = useStoreActions()
  const [user, setUser] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        text: `Login successful! Welcome ${username}`,
        type: "success",
      });
    } catch {
      setNotification({
        text: `Bad credentials! Check your password or username`,
        type: "error",
      });
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const logOut = async (event) => {
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      window.localStorage.clear();
      setUser(null);
      setUsername("");
      setPassword("");
      setNotification({ text: `Logout successful!`, type: "success" });
      
    } catch (error) {
      setNotification({
        text: `Logout issue. Please bother your local admin!`,
        type: "error",
      });
    }
  };

  const removeBlog = async (blogObject) => {
    const newList = blogs.filter((blog) => blog.id !== blogObject.id);

    const confirmDelete = window.confirm(`Delete ${blogObject.title}?`);
    if (!confirmDelete) {
      return;
    }

    await blogService
      .removal(blogObject.id)
      .then((response) => {
        setBlogs(newList);
        setNotification({
          text: `Removal of blog successful!`,
          type: "success",
        });
        
      })
      .catch((error) => {
        setNotification({
          text: `Error: ${error.response.data.error}`,
          type: "error",
        });
      });

    setBlogs((blogs) => blogs.filter((blog) => blog.id !== blogObject.id));
  };

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
              {!user && (
                <Button color="inherit" component={Link} to="/login" sx={style}>
                  Login
                </Button>
              )}
              {user && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/create"
                  sx={style}
                >
                  Create blog
                </Button>
              )}
              {user && (
                <Button
                  color="inherit"
                  component={() => {
                    logOut;
                  }}
                  sx={style}
                >
                  Create blog
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
                    user={user}
                    removeBlog={removeBlog}
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
                    user={user}
                    removeBlog={removeBlog}
                  />
                </ErrorBoundary>
              }
            />
            {!user && (
              <Route
                path="/login"
                element={
                  <ErrorBoundary>
                    <LoginForm
                      handleLogin={handleLogin}
                      handleUsernameChange={handleUsernameChange}
                      handlePasswordChange={handlePasswordChange}
                      username={username}
                      password={password}
                    />
                  </ErrorBoundary>
                }
              />
            )}
            <Route
              path="/create"
              element={
                <ErrorBoundary>
                  <BlogForm
                    user={user}
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
