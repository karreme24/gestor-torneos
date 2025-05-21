import { Outlet } from 'react-router-dom'

const SimpleLayout = () => {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  )
}
export default SimpleLayout;