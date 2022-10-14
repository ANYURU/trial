import { ImFilesEmpty } from 'react-icons/im'
import { IconContext } from 'react-icons/lib'

function NothingShown() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center text-gray-700 dark:text-secondary-text font-bold text-lg'>
      <IconContext.Provider value={{ className: `mb-2` }}>
        <ImFilesEmpty  size={70}/>
      </IconContext.Provider>
      <p>Nothing to Show yet</p>
    </div>
  )
}

export default NothingShown