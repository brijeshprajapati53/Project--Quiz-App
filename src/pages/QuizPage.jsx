import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { answerQuestion } from '../store/quizSlice'

export default function QuizPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { questions, currentQuestionIndex, timeLeft } = useSelector(state => state.quiz)

  const [selected, setSelected] = useState(null)
  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'quiz/decrementTime' })
    }, 1000)
    return () => clearInterval(timer)
  }, [dispatch])

  useEffect(() => {
    if (timeLeft <= 0) {
      const remaining = questions.slice(currentQuestionIndex)
      remaining.forEach(() => {
        dispatch(answerQuestion({ selected: null, isCorrect: false }))
      })
      navigate('/result')
    }
  }, [timeLeft, currentQuestionIndex, questions, dispatch, navigate])

  const handleNext = () => {
    const isCorrect = selected === currentQuestion.answer
    dispatch(answerQuestion({ selected, isCorrect }))
    setSelected(null)
    if (currentQuestionIndex + 1 >= questions.length) {
      navigate('/result')
    }
  }

  if (!questions.length) return (
    <div className="container mt-5 text-center">
      <div className="alert alert-warning">No quiz data found. Please return to the homepage.</div>
    </div>
  )

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Question {currentQuestionIndex + 1} of {questions.length}</h5>
                <span className="badge bg-danger fs-5">
                   {timeLeft}s
                </span>
              </div>

              <h4 className="mb-4">{currentQuestion.question}</h4>

              {currentQuestion.options.map((opt, index) => (
                <div className="form-check mb-2" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="answer"
                    id={`option${index}`}
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />
                  <label className="form-check-label" htmlFor={`option${index}`}>
                    {opt}
                  </label>
                </div>
              ))}

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={handleNext}
                disabled={selected === null}
              >
                {currentQuestionIndex + 1 === questions.length ? "Submit Quiz" : "Next Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
