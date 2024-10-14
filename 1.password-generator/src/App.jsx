import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)
  // console.log(passwordRef);

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm'

    if (numberAllowed) str += '0123456789'
      if (charAllowed) str += '@#$%&*?' 

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

  setPassword(pass)
  },[length, numberAllowed, charAllowed])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        placeholder='password'
        className='outline-none w-full py-1 px-3'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        readOnly
        ref={passwordRef}
         />
         <button onClick={copyPasswordToClipBoard}
         className='outline-none bg bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-5'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={20}
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          className='cursor-pointer'/>
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>setNumberAllowed(prev=>!prev)}
          className='cursor-pointer' />
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={()=>setCharAllowed(prev=>!prev)}
          className='cursor-pointer'/>
          <label htmlFor='characterInput'>Character</label>
        </div>
       </div>
    </div>
  )
}

export default App
