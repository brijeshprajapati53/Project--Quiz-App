import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setName, setQuestions } from '../store/quizSlice'
import questions from '../data/questions'
import { useForm } from 'react-hook-form'

export default function HomePage() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const trimmedName = data.username.trim()
    if (!trimmedName) {
      alert("Please enter your name.")
      return
    }
    dispatch(setName(trimmedName))
    dispatch(setQuestions(questions))
    navigate('/quiz')
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-3"> Welcome to the Quiz App</h2>
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Your Name</label>
              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                id="username"
                placeholder="Enter your name"
                {...register("username", { required: true })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 btn-lg rounded-3 shadow-sm">
              Start Quiz 
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
