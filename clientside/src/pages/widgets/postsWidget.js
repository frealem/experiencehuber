// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../../components/States/states";
import PostWidget from "./postWidget";
import { posts } from "../../fakeData";

const PostsWidget = ({ userId, isProfile = false }) => {

  return (
    <>
      {posts.map(
        () => (
          <PostWidget />
        )
      )}
    </>
  );
};

export default PostsWidget;