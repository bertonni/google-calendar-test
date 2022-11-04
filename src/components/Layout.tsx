import { FC, PropsWithChildren } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: FC<PropsWithChildren> = ({children}) => {  

  return (
    <div className="h-screen w-ful relative flex flex-col">
      <Navbar />
      <div className="flex-1 w-full pt-6">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;