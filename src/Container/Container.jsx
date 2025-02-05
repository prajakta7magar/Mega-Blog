import React from 'react'

function Container({children}) //children is special type of props that representes the content 
// nested inside the  component..react automaticallly provides props to every component
{
  return <div className='w-full max-w-7xl mx-auto px-4'>{children} </div>;
  
}

export default Container;
