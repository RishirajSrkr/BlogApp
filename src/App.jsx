import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'; 
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {

  //when we need to get some data from database, or do network request we should make a 'loading' state.

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  //when the app renders for the first time we need to check whether the user is already logged or not.
  //so we use 'useeffect' to do it

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))
  }, [])


  // conditional Rendering
  return loading ? (null) : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>

      <div className='w-full block'>

        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
