import React from "react";
import Post from "./Post";
import { Paper } from "@material-ui/core";

const Posts = ({ posts, container }) => {
  return (
    <>
      <Paper className={container}>
        {posts.map(post => (
          <Post
            key={post._id}
            name={post.name}
            email={post.email}
            post={post.post}
            date={post.date}
          />
        ))}
      </Paper>
    </>
  );
};

export default Posts;
