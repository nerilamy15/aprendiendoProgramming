import React from "react";
import Post from "./Post";

const Posts = ({ posts, container, token }) => {
  return (
    <>
      <div className={container}>
        {posts.map(post => (
          <Post
            key={post._id}
            postId={post._id}
            name={post.name}
            post={post.post}
            date={post.date}
            likes={post.likes}
            dislikes={post.disLikes}
            token={token}
          />
        ))}
      </div>
    </>
  );
};

export default Posts;
