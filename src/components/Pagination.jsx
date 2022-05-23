import { useState } from "react";
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io'
import { IoCaretForwardSharp, IoCaretBackSharp } from 'react-icons/io5'


export default function Pagination({pages, setCurrentPage, data,  depositsPerPage, setDepositsPerPage, indexOfFirstPage, indexOfLastPage}){
    const [ currentButton, setCurrentButton ] = useState(1)
    const numOfPages = []
    for(let i = 1; i <= pages; i++) numOfPages.push(i)
    
    return (
        <>
          <div className="flex gap-2">
            <span className="dark:text-secondary-text">Rows per page:
            </span>
              <select value={depositsPerPage}
                onChange={event => setDepositsPerPage(event.target.value)}
                className="dark:bg-dark-bg-600 dark:text-secondary-text"
              >
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
          </div>

          <div className="flex">
            <div className="flex gap-3">
              <span className={`${currentButton === 1 ? 'bg-accent dark:bg-dark-bg-600' : 'w-7 h-7 border-none rounded-full bg-primary flex justify-center text-white'} w-7 h-7 border-none rounded-full flex justify-center text-center items-center`}>
                  <button onClick = {() => {
                          setCurrentButton(1)
                          setCurrentPage(1)
                      }}>
                      <IoMdSkipBackward />
                  </button>
              </span>
              <span className={`${currentButton === 1 ? 'bg-accent dark:bg-dark-bg-600' : 'w-7 h-7 border-none rounded-full bg-primary flex justify-center text-white'} w-7 h-7 border-none rounded-full flex justify-center text-center items-center`}>
                  <button onClick = {() => {
                          setCurrentButton( prev => prev === 1 ? prev : prev-1 )
                          setCurrentPage(prev => prev === 1 ? prev : prev - 1)
                      }}>
                      <IoCaretBackSharp />
                  </button>
              </span>
            </div>
            <div className="dark:text-secondary-text"><b>{indexOfFirstPage + 1} </b> - <b>{indexOfLastPage >= data.length ? data.length : indexOfLastPage}</b> of <b> {data.length}</b></div>
            <div className="flex gap-3">
              <span className={`${currentButton === numOfPages.length ? 'bg-accent dark:bg-dark-bg-600' : 'w-7 h-7 border-none rounded-full bg-primary flex justify-center text-white'} w-7 h-7 border-none rounded-full flex justify-center text-center items-center`}>
                  <button onClick={() => {
                      setCurrentButton(next => next === numOfPages.length ? next : next + 1)
                      setCurrentPage(next => next === numOfPages.length ? next : next + 1)
                  }}>
                      <IoCaretForwardSharp />
                  </button>
              </span>
              <span className={`${currentButton === numOfPages.length ? 'bg-accent dark:bg-dark-bg-600' : 'w-7 h-7 border-none rounded-full bg-primary flex justify-center text-white'} w-7 h-7 border-none rounded-full flex justify-center text-center items-center`}>
                  <button onClick={() => {
                      setCurrentButton(numOfPages.length)
                      setCurrentPage(numOfPages.length)
                      }}>
                          <IoMdSkipForward />
                  </button>
              </span>
            </div>
          </div>
        </>
    )
}