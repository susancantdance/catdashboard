// import { post } from "../../../backend/routes/indexRouter";
import "./comments.css";
import { useState } from "react";

function Comments({ post, setDisplay, postComments }) {
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    text: "",
  });

  const [allComments, setAllComments] = useState(postComments);

  const token = localStorage.getItem("jwtToken");

  const editComment = (comm) => {
    setEditId(comm.id);
    setFormData({ text: comm.text });
  };
  const delComment = async (comm) => {
    try {
      const response = await fetch(
        // `http://localhost:3000/posts/${post.id}/comments/${comm.id}`,
        `${import.meta.env.VITE_DB_URL}/posts/${post.id}/comments/${comm.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const nextComments = allComments.filter((cmt) => {
        console.log("cmt.id " + cmt.id + " data.id " + data.id);
        return cmt.id != data.id;
      });
      console.log("nextComments");
      console.log(nextComments);

      //   setPost(post);
      setDisplay("comments");
      setAllComments(nextComments);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  const updateComment = async (comm) => {
    try {
      const response = await fetch(
        // `http://localhost:3000/posts/${post.id}/comments/${comm.id}`,
        `${import.meta.env.VITE_DB_URL}/posts/${post.id}/comments/${comm.id}`,
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
      setEditId(null);
      const nextComments = allComments.map((cmt) => {
        console.log(`${cmt.id} comment id`);
        if (cmt.id == data.id) {
          return {
            id: cmt.id,
            postid: cmt.postid,
            text: data.text,
            timestamp: Date.now(),
            userid: cmt.userid,
          };
        } else {
          return cmt;
        }
      });
      console.log(nextComments);
      setAllComments(nextComments);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="comments">
      <h1>COMMENTS!</h1>
      <ul>
        {allComments.map((comment) => {
          return (
            <li key={comment.id}>
              {editId != comment.id ? (
                comment.text
              ) : (
                <input
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                />
              )}
              <br></br>
              <br></br>
              {editId != comment.id ? (
                <button type="button" onClick={() => editComment(comment)}>
                  Edit
                </button>
              ) : (
                <button type="button" onClick={() => updateComment(comment)}>
                  Update
                </button>
              )}

              <button type="button" onClick={() => delComment(comment)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { Comments };
