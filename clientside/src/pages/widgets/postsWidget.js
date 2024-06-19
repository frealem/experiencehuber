// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../../components/States/states";
import PostWidget from "./postWidget";
//import { posts } from "../../fakeData";

const PostsWidget = ({wrapperHeight, posts, setPosts, type}) => {
  const token = localStorage.getItem('accessToken');
  return (
    <>
    {posts? (
      posts.map(
        (post) => (
          <PostWidget wrapperHeight={wrapperHeight} post={post} setPosts={setPosts} token={token} type={type}/>
        )
      )
    ): "loading.."}
    </>
  );
};

export default PostsWidget;