import avatar from "../../assets/avatar.jpg";
import "../../styles/ProfilePage.css";

function ProfilePage() {
  const username = "sirine";
  const bio = "j'aime me faire peur";
  const date ="14/05/2023"
  return (
    <div className="profile">
      <h1>{username}</h1>
      <div className="profile-content">
        <img className="profile-pic" src={avatar} alt="profile-pic" />
        <div className="profile-container">
            <h5>"{bio}"</h5>
            <div className="date">inscrite le {date}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
