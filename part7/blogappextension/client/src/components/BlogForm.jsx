import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useStoreActions } from "../store";
import { useField } from '../hooks';

const BlogForm = (user) => {
  const { setNotification, addBlog } = useStoreActions()
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');
  const likes = useField('number');
  const navigate = useNavigate();

  const makeBlog = async (event) => {
    console.log(event.target.title)
    try {
      event.preventDefault();
      await addBlog({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
        likes: event.target.likes.value,
      }, user);
      title.onReset();
      author.onReset();
      url.onReset();
      likes.onReset();

      navigate("/");
    } catch (error) {
      console.log(error);
      setNotification({
        text: `${error.response.data.error}`,
        type: "success",
      });
    }
  };

  return (
    <div>
      <h1>Post new blog</h1>
      <form onSubmit={makeBlog}>
        <div>
          <TextField
            {...title}
            label="Title"
            id="title"
          />
        </div>
        <div>
          <TextField
            {...author}
            label="Author"
            id="author"
          />
        </div>
        <div>
          <TextField
            {...url}
            label="Url"
            id="url"
          />
        </div>
        <div>
          <TextField
            {...likes}
            label="Likes"
            id="likes"
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          send
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
