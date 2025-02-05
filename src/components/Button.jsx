import React from 'react'

function Button({
    children,
    type='button',
    bgColor="bg-blue-300",
    textColor='white',
    className=' ',
    ...props // spread props as any user property

    }
)
 {
  return (
   <button className={` rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className} {...props}`}>{children}</button>
  )
}

export default Button
