import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  timeLeft: 60,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.trim()
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
      state.currentQuestionIndex = 0
      state.score = 0
      state.answers = []
      state.timeLeft = 60
    },
    answerQuestion: (state, action) => {
      const { selected, isCorrect } = action.payload
      const currentQ = state.questions[state.currentQuestionIndex]

      state.answers.push({
        question: currentQ?.question || '',
        selected,
        correctAnswer: currentQ?.answer || '',
        isCorrect,
      })

      if (isCorrect) state.score += 1
      state.currentQuestionIndex += 1
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) state.timeLeft -= 1
    },
    resetQuiz: (state) => {
      state.name = ''
      state.questions = []
      state.currentQuestionIndex = 0
      state.score = 0
      state.answers = []
      state.timeLeft = 60
    }
  }
})

export const {
  setName,
  setQuestions,
  answerQuestion,
  decrementTime,
  resetQuiz
} = quizSlice.actions

export default quizSlice.reducer
