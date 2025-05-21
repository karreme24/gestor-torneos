import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar'



const MainLayout = ({activePath, setActivePath, navigateTo}) => {
 
  
  
  
  
  return (
    
    <div className="flex">
      <SideBar activePath={activePath} setActivePath={setActivePath} navigateTo={navigateTo}  />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
    
  )
}
export default MainLayout;