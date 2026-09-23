import React from 'react'
import useStore from '../store/store'

const Display = () => {
    const list=useStore((state)=>state.list);
  return (
    <>
    <ul>
      {
        list.map((notes)=>(
            <li key={notes.id}>
                <h1>{notes.title}</h1>
                <p>{notes.content}</p>
                <p>{notes.category}</p>
            </li>
        ))
      }

    </ul>
    
    
    </>
  )
}

export default Display