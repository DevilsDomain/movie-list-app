import React from 'react'

type MovieDetailsParam = {
  params: { imdbId: string };
}

function page({ params: { imdbId } }: MovieDetailsParam) {
  return (
    <div>Movie details {imdbId}</div>
  )
}

export default page