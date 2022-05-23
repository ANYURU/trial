import myGif from '../assets/images/tube.gif'

function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center bg-white'>
        <img src={myGif} alt='loading' />
    </div>
  )
}

export default Loader