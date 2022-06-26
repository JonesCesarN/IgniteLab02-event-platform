import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {


  return (
    <div className='w-screen h-screen flex items-center justify-center bg-blur'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="500"
        viewBox="0 0 837 1045"
        className='lg:absolute lg:top-[50%] lg:left-[50%] lg:mt-[-250px] lg:ml-[-400px]'
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="6">
          <path
            stroke="#007FB2"
            d="M353 9l273.664 161v317L353 642 79.336 487V170L353 9z"
          ></path>
          <path
            stroke="#EF4A5B"
            d="M78.5 529l68.5 40.186v79.125L78.5 687 10 648.311v-79.125L78.5 529z"
          ></path>
          <path
            stroke="#795D9C"
            d="M773 186l54 31.539v62.098L773 310l-54-30.363v-62.098L773 186z"
          ></path>
          <path
            stroke="#F2773F"
            d="M639 529l134 78.847v155.245L639 839l-134-75.908V607.847L639 529z"
          ></path>
          <path
            stroke="#36B455"
            d="M281 801l102 60.025v118.187L281 1037l-102-57.788V861.025L281 801z"
          ></path>
        </g>
      </svg>
      <div className="h-[200px] w-[380px] absolute top-[50%] left-[50%] mt-[-100px] ml-[-190px] lg:ml-[50px] text-center lg:text-left">
        <h1 className='text-[60px] mb-[40px]'>404</h1>
        <p>Page not found</p>
        <div className="buttons-con">
          <div className="mt-[40px]">
            <Link className='py-[8px] px-[25px] rounded bg-green-500 hover:bg-green-700 text-[14px] text-gray-900' to="/">
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
