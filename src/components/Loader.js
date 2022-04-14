import myGif from '../assets/images/tube.gif'

function Loader() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <img src={myGif} alt='loading' />
    </div>
  )
}

export default Loader