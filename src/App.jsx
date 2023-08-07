import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Content from './components/Content/Content'
import './App.css'

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [contentState, setContentState] = useState(0);
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleContentState = (state) => {
    setContentState(state);
  }
  return (
      <div className='d-flex h-100'>
        <Sidebar showSidebar={showSidebar} toggleSidebar={handleToggleSidebar} changeContentState={handleContentState}/>
        <Content showSidebar={showSidebar} toggleSidebar={handleToggleSidebar} contentState={contentState}/>
      </div>
  )
}

export default App
