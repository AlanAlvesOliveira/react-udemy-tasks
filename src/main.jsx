import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProjectContextReducerProvider from './store/project-context-reducer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ProjectContextReducerProvider>
      <App />
    </ProjectContextReducerProvider>

  </React.StrictMode>,
)
