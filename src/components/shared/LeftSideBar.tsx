import { Link, NavLink, useNavigate,useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { useEffect } from "react";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
function LeftSideBar() {
  const {mutate:signOut,isSuccess} = useSignOutAccount()
  const navigate = useNavigate()
  const { user } = useAuthContext();
 const {pathname} = useLocation()
 useEffect(()=>{
  if(isSuccess){
    navigate(0)
  }
},[isSuccess])
  
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-6">
        <Link to='/' className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`}
          className="flex gap-3 items-center"
        >
          <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-4">

          {sidebarLinks.map((link) => {
            const isActive = pathname===link.route
            return (
              <li className={`leftsidebar-link group ${isActive && `bg-primary-500`}`} key={link.label}>
                <NavLink to={link.route} className="flex flex-row gap-4 items-center p-4">
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && `invert-white`}`}/>
                  {link.label}
                </NavLink>
              </li>
            )
          })}

        </ul>
      </div>
      <Button variant="ghost" className="shad-button_ghost" onClick={()=>signOut()}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p>Logout</p>
              </Button>
    </nav>
  )
}

export default LeftSideBar