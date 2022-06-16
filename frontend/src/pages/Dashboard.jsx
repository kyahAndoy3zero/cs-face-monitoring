import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect} from 'react'
import Spinner from '../components/Spinner/Spinner'

const Dashboard = () => {
  
   
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
 

    useEffect(() => {
        
        if (!user) {
          navigate('/login')
        }
        // dispatch(getRooms())

        
    // return () => {
    //   dispatch(reset())
    // }
      }, [user, navigate, dispatch])

    
      // if(isLoading){
      //   return <Spinner/>
      // }
  return (
    <>

        <div className="container px-4 mx-auto my-12 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
        
        </div>
        </div>
    </>
  )
}

export default Dashboard