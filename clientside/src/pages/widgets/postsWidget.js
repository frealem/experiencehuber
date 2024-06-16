// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../../components/States/states";
import PostWidget from "./postWidget";
//import { posts } from "../../fakeData";

const PostsWidget = ({ posts, setPosts}) => {
  console.log(posts)
  return (
    <>
    {posts? (
      posts.map(
        (post) => (
          <PostWidget post={post} setPosts={setPosts}/>
        )
      )
    ): "loading.."}
    </>
  );
};

export default PostsWidget;