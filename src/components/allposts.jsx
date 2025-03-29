import { Link } from "react-router";
// import { useEffect } from "react";
// import { useState } from "react";
//
// import { PostContext } from "../App";
import { useNavigate } from "react-router-dom";
// import { Post } from "./post";
import "./allposts.css";

function AllPosts({ posts, setPost, setDisplay }) {
  //   const [post, setPost] = useState(null);

  //   useEffect(() => {
  //     fetch("http://localhost:3000/posts", {
  //       method: "GET",
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("post data");
  //         console.log(data);
  //         setPosts(data);
  //       });
  //   }, []);

  const navigate = useNavigate();

  const toggleEditing = (postToEdit) => {
    setPost(postToEdit);
    setDisplay("singlepost");
    // navigate("/dashboard/edit/" + id);
    // console.log(postToEdit.id);
    // console.log(postToEdit);
    // navigate("edit/" + postToEdit);
  };

  const editComments = (postToEdit) => {
    setPost(postToEdit);
    setDisplay("comments");
  };

  const createPost = () => {
    setPost({ title: "", body: "" });
    setDisplay("singlepost");
  };

  const logout = () => {
    localStorage.clear("jwtToken");
    localStorage.clear("id");
    localStorage.clear("userid");
    localStorage.clear("author");
    navigate("/");
  };

  //   if (post == null) {
  return (
    <>
      <h1>Your Clog Dashboard</h1>
      <div className="create">
        <button onClick={createPost}>Create New Post</button>{" "}
        <button onClick={logout}>Log Out</button>
      </div>

      <div className="postcontainer">
        <ul className="posts">
          {posts.map((pst) => {
            return (
              <li key={pst.id} className={pst.ispublished ? "green" : ""}>
                <b>{pst.title}</b>
                <br></br>
                {pst.body}
                <br></br>
                <br></br>
                {/* <form onSubmit={() => toggleEditing(pst)}> */}
                <button type="button" onClick={() => toggleEditing(pst)}>
                  Edit Post
                </button>{" "}
                <button
                  className="edit"
                  type="button"
                  onClick={() => editComments(pst)}
                >
                  Edit Comments ({pst.comments.length})
                </button>
                {pst.ispublished ? (
                  <span>
                    {" "}
                    <span className="published"> **Published**</span>
                  </span>
                ) : null}
                {/* </form> */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
  //   } else {
  //     return (
  //       <>
  //         <h1>This the outlet for {post.id}</h1>
  //         <Outlet context={[post, setPost]} />
  //       </>
  //     );
  //   }
}

export { AllPosts };
