import Blog from "./Blog";
import { useBlogsListing } from "../store";
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import React from "react";

const BlogList = () => {
  const blogs = useBlogsListing()
  const id = React.useId();

  return (
    <div>
      <h1>
      <Typography variant="h4" component="span"><b>Blogs</b></Typography></h1>
      <div>
        <Accordion>
          <AccordionSummary
            aria-controls={`${id}-panel1-content`}
            id={`${id}-panel1-header`}
          >
            <Typography variant="h5" component="span"><b>Recent blogs</b></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog user={blog.user} key={blog.id} blog={blog} />
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default BlogList;
