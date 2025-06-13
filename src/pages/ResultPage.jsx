import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ResultPage() {
  const { name, score } = useSelector(state => state.quiz)
  const navigate = useNavigate()
  const saved = useRef(false)

  useEffect(() => {
    if (!saved.current && name && score >= 0) {
      const existing = JSON.parse(localStorage.getItem('scores')) || []
      const newEntry = {
        name,
        score,
        date: new Date().toISOString()  // ✅ ISO string for reliable storage
      }
      localStorage.setItem('scores', JSON.stringify([...existing, newEntry]))
      saved.current = true
    }
  }, [name, score])

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0 p-4">
            <div className="card-body text-center">
              <h2 className="text-success mb-4">Quiz Completed!</h2>

              {name ? (
                <>
                  <p className="fs-5"><strong>Name:</strong> {name}</p>
                  <p className="fs-5"><strong>Score:</strong> {score}</p>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/leaderboard')}
                  >
                    View Leaderboard
                  </button>
                </>
              ) : (
                <div className="alert alert-danger">
                  No valid user name or score. Result not saved.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
