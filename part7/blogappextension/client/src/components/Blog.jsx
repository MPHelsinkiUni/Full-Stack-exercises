import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [detailVisible, setDetailVisibility] = useState(false);
  const hideWhenVisible = { display: detailVisible ? "none" : "" };
  const showWhenVisible = { display: detailVisible ? "" : "none" };
  const login = user !== null;
  const owner = login && user.username === blog.user.username;
  const showWhenLogin = { display: login ? "" : "none" };
  const showWhenOwner = { display: owner ? "" : "none" };

  const likeUp = (event) => {
    event.preventDefault();
    updateBlog(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
    });
  };

  const remove = (event) => {
    event.preventDefault();
    removeBlog(blog);
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            <b>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </b>{" "}
            by {blog.author} <br />
          </Typography>
          <br />
          <div style={hideWhenVisible}>
            <Button onClick={() => setDetailVisibility(true)}>
              Show details
            </Button>
          </div>
          <div style={showWhenVisible}>
            <Typography variant="body2" component="div">
              URL: {blog.url}
              <br />
              Likes: {blog.likes}
              <br />
              Poster: {blog.user.username}
              <br />
            </Typography>
            <Button onClick={() => setDetailVisibility(false)}>
              Hide details
            </Button>
            <br />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
