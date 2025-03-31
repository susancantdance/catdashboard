// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { Header } from "./header.jsx";
import { Comments } from "./comments.jsx";
// import { useOutletontext } from "react";
// import { PostContext } from "../App";

import "./post.css";

function Post({ post, setDisplay, comments }) {
  console.log("THIS IS THE POST FUNCTION!");

  console.log(post.id);

  // const [isChecked, setIsChecked] = useState(post.ispublished);

  let postComments = [];

  if (comments) {
    postComments = post.comments.slice();
    console.log(postComments);
  }

  const [formData, setFormData] = useState({});

  if (post && formData == {}) {
    let postData = {
      id: post.id,
      title: post.title,
      body: post.body,
      ispublished: post.ispublished,
    };
    setFormData(postData);
  } else if (formData == {}) {
    let newData = {
      title: "",
      body: "",
      authorid: +localStorage.getItem("userid"),
      ispublished: false,
    };
    setFormData(newData);
  }

  const token = localStorage.getItem("jwtToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT");
    console.log(formData);
    if (post.id != null) {
      console.log("POST ID EXISTS");
      try {
        const response = await fetch(
          // `http://localhost:3000/posts/${post.id}`,
          `${import.meta.env.VITE_DB_URL}/posts/${post.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        console.log(data);
        //   setPosts(posts);
        // navigate("/preview" + postid);
        setDisplay("allposts");
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    } else {
      console.log("NO POST ID");
      try {
        const response = await fetch(
          `http://localhost:3000/posts`,
          `${import.meta.env.VITE_DB_URL}/posts`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        console.log(data);
        //   setPosts(posts);
        // navigate("/preview" + postid);
        setDisplay("allposts");
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.id == "publish") {
      // setIsChecked(e.target.checked);
      setFormData({ ...formData, ispublished: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const deletePost = async () => {
    if (confirm("are you sure?")) {
      try {
        const response = await fetch(
          // `http://localhost:3000/posts/${post.id}`,
          `${import.meta.env.VITE_DB_URL}/posts/${post.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        console.log(data);
        //   setPosts(posts);
        // navigate("/preview" + postid);
        setDisplay("allposts");
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    }
  };

  console.log(formData);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/posts/${post.id}`, {
  //       method: "GET",
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // console.log("singlepost");
  //         console.log(data);
  //         setPost(data);
  //         // setAuthor(data.author);
  //         setFormData({ title: data.title, body: data.body });
  //       });
  //     // setComments(data.comments);
  //   }, [post, setPost]);

  return (
    <>
      <div>
        <h1>A Single Post</h1>
        <div className="post">
          <div key={post.id} className="postbody">
            <form className="formfields" onSubmit={handleSubmit}>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <br></br>
              {/* <p className="author">Author: {author.email}</p> */}
              Body:
              <textarea
                type="text"
                name="body"
                value={formData.body}
                onChange={handleChange}
              ></textarea>
              {post.id == null ? (
                <button type="submit">Create Post</button>
              ) : (
                <>
                  <button type="submit">Update Post</button>
                  <button onClick={deletePost} type="button">
                    Delete Post
                  </button>
                  <div className="publish-checkbox">
                    <span>Published</span>

                    <>
                      <input
                        className="ckbox"
                        type="checkbox"
                        checked={formData.ispublished}
                        id="publish"
                        name="ispublished"
                        onChange={handleChange}
                      />
                      <input
                        type="hidden"
                        name="ispublished"
                        value={false}
                      ></input>
                    </>
                  </div>
                </>
              )}
              <br></br>
            </form>
            <button
              className="dashboard"
              onClick={() => setDisplay("allposts")}
            >
              Go Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      {comments ? (
        <Comments
          post={post}
          setDisplay={setDisplay}
          postComments={postComments}
        />
      ) : null}
    </>
  );
}

export { Post };
