import PropTypes from "prop-types";
UserData.propTypes = {
  userData: PropTypes.shape({
    handle: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string,
    rating: PropTypes.number.isRequired,
    rank: PropTypes.string.isRequired,
    city: PropTypes.string,
    contribution: PropTypes.number.isRequired,
  }),
};

function UserData({ userData }) {
  return (
    <div className="mt-8">
      {userData && (
        <div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={userData.avatar}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{userData.handle}</h2>
              <p className="text-gray-600">@{userData.handle}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            {userData.bio || "No bio provided"}
          </p>
          <div className="mt-4">
            <span className="mr-4">
              <i className="fas fa-users"></i>{" "}
              <a
                href={`https://codeforces.com/profile/${userData.handle}`}
                className="text-black"
              >
                {userData.rating} rating
              </a>
            </span>
            <span>
              <i className="fas fa-user-friends"></i>{" "}
              <a
                href={`https://codeforces.com/profile/${userData.handle}`}
                className="text-black"
              >
                {userData.rank}
              </a>
            </span>
          </div>
          <div className="mt-4">
            <i className="fas fa-map-marker-alt"></i>{" "}
            {userData.city || "City not provided"}
          </div>
          <div className="mt-4">
            <i className="fas fa-book"></i> {userData.contribution}{" "}
            contributions
          </div>
        </div>
      )}
    </div>
  );
}

export default UserData;
