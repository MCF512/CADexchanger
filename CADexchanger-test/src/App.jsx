import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCoordinates } from './actions';
import { Canvas, Form } from './components';
import './App.css';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoordinates({
      height: 10,
      radius: 10,
      sections: 10
    }))
  }, [])

  return (
    <div>
      <Form />
      <Canvas />
    </div>
  )
}

export default App
