import { createContext, useContext,useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { IContextType, IUser } from "@/types"
import { getCurrentUser } from "@/lib/appwrite/api"
export const INITIAL_USER= {
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
}
const INITIAL_STATE= {
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async ()=> false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)
function AuthContextProvider({children}:{children:React.ReactNode}) {
    const navigate=useNavigate()
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading,setIsLoading] = useState(false);
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const checkAuthUser = async ()=>{
        try {
            setIsLoading(true)
            const currentAccount=await getCurrentUser();
            if(currentAccount){
               setUser({
                id:currentAccount.$id,
                name:currentAccount.name,
                username:currentAccount.username,
                email:currentAccount.email,
                imageUrl:currentAccount.imageUrl,
                bio:currentAccount.bio
            }) 
                setIsAuthenticated(true);
                return true;

            }
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
        finally{
            setIsLoading(false);
        }
  }
  useEffect(() => {
    
      if(localStorage.getItem('cookieFallback')==='[]' || localStorage.getItem('cookieFallback')===null){
        navigate('/sign-in')
    }
    
     checkAuthUser()
    
  }, [])
  

  const value= {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
        
  )
}

export default AuthContextProvider

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}
export {AuthContextProvider}