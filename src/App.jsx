import { useState } from "react";
import UserData from "./UserData";
import RecentSubmissions from "./RecentSubmissions";

function App() {
  const [userData, setUserData] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const searchUser = async () => {
    const input = document.getElementById("searchInput").value.trim();
    if (!input) {
      alert("Please enter a Codeforces username");
      return;
    }
    try {
      let response = await fetch(
        `https://codeforces.com/api/user.info?handles=${input}`
      );
      let userData = await response.json();
      if (userData.status === "OK") {
        setUserData({
          handle: userData.result[0].handle,
          avatar: userData.result[0].titlePhoto,
          bio: userData.result[0].about,
          rating: userData.result[0].rating,
          rank: userData.result[0].rank,
          city: userData.result[0].city,
          contribution: userData.result[0].contribution,
        });

        // Fetch recent submissions
        let submissionsResponse = await fetch(
          `https://codeforces.com/api/user.status?handle=${input}&from=1&count=5`
        );
        let submissionsData = await submissionsResponse.json();
        if (submissionsData.status === "OK") {
          setSubmissions(submissionsData.result);
        } else {
          console.error("Error fetching submissions:", submissionsData.comment);
        }
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-8">
        <h1 className="text-3xl font-semibold mb-4">Codeforces User Profile</h1>
        <div className="mb-6">
          <label htmlFor="searchInput" className="block text-gray-600 mb-2">
            Search for a Codeforces user
          </label>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              id="searchInput"
              type="text"
              className="w-full px-4 py-2 focus:outline-none"
              placeholder="Type a Codeforces username"
            />
            <button
              onClick={searchUser}
              className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>
        <UserData userData={userData} />
        <RecentSubmissions submissions={submissions} />
      </div>
    </div>
  );
}

export default App;
