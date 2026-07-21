import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useBlogsListing, useKeptUsername, useStoreActions } from "../store";
import { useField } from "../hooks";
import {
  Card,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const Detail = () => {
  const blogs = useBlogsListing()
  const commentField = useField('text')
  const { updateBlog, removeBlog, comment } = useStoreActions();
  const id = useParams().id;
  const navigate = useNavigate();
  const user = useKeptUsername();
  const blog = blogs.find((n) => n.id === id);
  if (!blog) {
    return <div>Loading. Please return to homepage before refreshing</div>;
  }
  const login = user !== null;
  const owner = login && user.username === blog.user.username;
  const showWhenLogin = { display: login ? "" : "none" };
  const showWhenOwner = { display: owner ? "" : "none" };
  const showIfCommentsEmpty = { display: blog.comments.length === 0 ? "" : "none"};
  const showIfComments = { display: blog.comments.length !== 0 ? "" : "none"};

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

  const remove = async (event) => {
    event.preventDefault();
    await removeBlog(blog);
    navigate("/");
  };

  const commentHandler = async (event) => {
    event.preventDefault();
    await comment(blog.id, event.target.comment.value)
    commentField.onReset()
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            <b>{blog.title}</b> by {blog.author} <br />
          </Typography>
          <div>
            <Typography variant="h6" component="div">
              <ul>
                <li>URL: {blog.url}</li>
                <li>Likes: {blog.likes}</li>
                <li>Poster: {blog.user.username}</li>
              </ul>
            {!user && <div>Login to interact with the blog operations if you are the owner.</div>}
            <div style={showWhenOwner}>
              <Button onClick={remove}>Remove blog</Button>
            </div>
            <div style={showWhenLogin}>
              <Button onClick={likeUp}>Like</Button>
            </div>
            </Typography>
          </div>
          <div>
          <Typography variant="h6" component="div">
            <b>Comments</b> <br />
          </Typography>
          <Typography variant="body1" component="div">
            <div>
              <form onSubmit={commentHandler}>
                <div>
                  <TextField {...commentField} label="Comment" id="comment" />
                </div>
              </form>
            </div>
            <div style={showIfCommentsEmpty}>
              <br/>
              No comments currently posted for this blog.
            </div>
            <div style={showIfComments}>
              <ul>
                {blog.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
          </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Detail;
