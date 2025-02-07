import { useState } from 'react';

function App() {
  const name: string = "Ryan";
  const [age, setAge] = useState<number>(22)

  const increaseAge = (): void => {
    setAge(age + 1)
  }

  const decreaseAge = (): void => {
    setAge(age - 1)
  }

  return (
    <div>
      <h1 className='text-6xl'>Hey! My name is {name}!</h1>
      <p className='font-bold'>I'm {age} years old!</p>
      <button onClick={increaseAge}>Increase Age</button>
      <button onClick={decreaseAge}>Decrease Age</button>
    </div>
  )
}

export default App
