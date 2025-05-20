import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let tasks = []

if (localStorage.getItem('tasks') === null) {
  localStorage.setItem('tasks', JSON.stringify([]));
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasks);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks = {tasks}/>
  </React.StrictMode>,
)
