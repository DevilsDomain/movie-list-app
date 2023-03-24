import React from 'react'

function Form() {
  return (
    <form className='flex flex-col items-start'>
        <label htmlFor='name'>name</label>
        <input type='text' id='name' name='name' placeholder='my move list...' />
        <button type='submit' >Create</button>
    </form>
  )
}

export default Form