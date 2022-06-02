import { ImFilesEmpty } from 'react-icons/im'
import { IconContext } from 'react-icons/lib'

function NothingShown() {
  return (
    <div className='h-full w-full flex flex-col items-center pt-10 text-gray-700 dark:text-secondary-text font-bold text-lg'>
      <IconContext.Provider value={{ className: `text-2xl` }}>
        <ImFilesEmpty />
      </IconContext.Provider>
      <p>Nothing to Show yet</p>
    </div>
  )
}

export default NothingShown