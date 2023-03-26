import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='p-5'>
        <Link href={'/'} className='text-4xl font-bold	'>OML</Link>
        <p>Online Movie List</p>
    </div>
  )
}

export default Navbar