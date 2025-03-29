import "./post.css";

function New() {
  return (
    <div>
      <h1>Create New Post</h1>
      <div className="post">
        <div className="postbody">
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
            <button type="submit">Update Post</button>
            <br></br>
          </form>
          <button onClick={() => setDisplay("allposts")}>
            Go Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
export { New };
