import { useEffect, useState } from 'react'

export default function LeaderboardPage() {
  const [scores, setScores] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('scores')) || []
    const sorted = stored.sort((a, b) => b.score - a.score)
    setScores(sorted)
  }, [])

  const formatDate = (dateStr) => {
    try {
      const parsed = new Date(dateStr)
      return isNaN(parsed.getTime())
        ? 'Invalid Date'
        : new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(parsed)
    } catch {
      return 'Invalid Date'
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="text-center mb-4 text-success">Leaderboard</h2>
              {scores.length === 0 ? (
                <p className="text-center text-muted">No scores recorded yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((entry, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{entry.name || <em className="text-muted">N/A</em>}</td>
                          <td>{entry.score}</td>
                          <td>{formatDate(entry.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
