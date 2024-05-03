import PropTypes from "prop-types";
RecentSubmissions.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      contestId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      problem: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      verdict: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function RecentSubmissions({ submissions }) {
  return (
    <div className="mt-8">
      {submissions.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Submissions</h2>
          <ul>
            {submissions.map((submission, index) => (
              <li key={index} className="mb-2">
                <a
                  href={`https://codeforces.com/contest/${submission.contestId}/submission/${submission.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {submission.problem.name}
                </a>{" "}
                - {submission.verdict}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecentSubmissions;
