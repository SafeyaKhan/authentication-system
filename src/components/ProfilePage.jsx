import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.profile);
  const [editableProfile, setEditableProfile] = useState({
    gender: "",
    email: "",
    username: "",
    lastName: "",
    location: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setEditableProfile(profile);
    }
  }, [profile]);

  const handleUpdate = () => {
    dispatch(updateProfile(editableProfile));
    Navigate("./postspage");
  };

  if (loading) return <p>Loading...</p>;

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
            Profile
          </h2>

          <div
            className="card"
            style={{
              width: "350px",
              textAlign: "left",
              flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
              padding: "50px",
              margin: "10px",
            }}
          >
            <p>Gender: {editableProfile.gender}</p>
            <p>Username: {editableProfile.username}</p>
            <p>Last Name: {editableProfile.lastName}</p>
            <p>Email: {editableProfile.email}</p>
            <p>Location: {editableProfile.location}</p>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Gender:
            </span>
            <input
              type="text"
              value={editableProfile.gender}
              onChange={(e) =>
                setEditableProfile({
                  ...editableProfile,
                  gender: e.target.value,
                })
              }
              required
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Location:
            </span>
            <input
              type="text"
              value={editableProfile.location}
              onChange={(e) =>
                setEditableProfile({
                  ...editableProfile,
                  location: e.target.value,
                })
              }
              required
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-light"
              style={{ marginLeft: "5px", background: "#d6e0e2" }}
              onClick={handleUpdate}
            >
              Update Profile
            </button>
            <button
              type="button"
              className="btn btn-light"
              style={{ marginLeft: "5px", background: "#d6e0e2" }}
              onClick={() => navigate("/postspage")}
            >
              Posts Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
