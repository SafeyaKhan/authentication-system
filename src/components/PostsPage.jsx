import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, createPost } from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function UserPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: posts, loading, error } = useSelector((state) => state.posts);

  const { user } = useSelector((state) => state.auth);
  // State for each required field
  const [description, setDescription] = useState("");
  // const [file, setFile] = useState(null);
  const [sportsId, setSportsId] = useState("623f4e8e2559522ba012744d");
  // const [venueId, setVenueId] = useState("");
  // const [packageType, setPackageType] = useState(""); // Assuming "package" is a string or identifier
  // const [activity, setActivity] = useState("");
  // const [type, setType] = useState("");
  //const [ratio, setRatio] = useState("");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Posts data:", posts); // Check if data structure is correct
  }, [posts]);

  // Handle form submission
  const handleCreatePost = (e) => {
    e.preventDefault();

    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append("description", description);
    // formData.append("file", file);
    formData.append("sports_id", sportsId);
    // formData.append("venue_id", venueId);
    // formData.append("package", packageType);
    // formData.append("activity", activity);
    // formData.append("type", type);
    // formData.append("ratio", ratio);

    // Dispatch the action with the form data
    dispatch(createPost(formData));

    // Reset form fields after submission
    setDescription("");
    //  setFile(null);
    setSportsId("");
    // setVenueId("");
    // setPackageType("");
    // setActivity("");
    // setType("");
    // setRatio("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div
          className="card"
          style={{
            width: "380px",
            textAlign: "center",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontFamily: "sans-serif",
              marginBottom: "10px",
            }}
          >
            User Posts
          </h2>
          {/* Form to create a new post */}
          <form onSubmit={handleCreatePost}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Description
              </span>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            {/* <div>
          <label>File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div> */}
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Sports ID:
              </span>

              <input
                type="text"
                value={sportsId}
                onChange={(e) => setSportsId(e.target.value)}
                placeholder="SportsId"
                required
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            {/* <div>
          <label>Venue ID:</label>
          <input
            type="text"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Package:</label>
          <input
            type="text"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Activity:</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ratio:</label>
          <input
            type="text"
            value={ratio}
            onChange={(e) => setRatio(e.target.value)}
            required
          />
        </div> */}
            <button
              type="submit"
              className="btn btn-light"
              style={{ marginLeft: "5px", background: "#d6e0e2" }}
            >
              Create Post
            </button>
          </form>

          <div
            className="card"
            style={{
              width: "350px",
              textAlign: "center",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
              margin: "10px",
            }}
          >
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && posts.length > 0 ? (
              <ul>
                {posts.map((post) => (
                  <p key={post._id}>
                    <p>Description: {post.description || "No description"}</p>
                    <p>Sports: {post.sports_id?.name || "N/A"}</p>
                    {/* Other fields */}
                  </p>
                ))}
              </ul>
            ) : (
              !loading && <p>No posts available.</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-light"
            style={{ marginLeft: "5px", background: "#d6e0e2" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
