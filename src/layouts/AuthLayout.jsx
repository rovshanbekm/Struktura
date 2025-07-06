import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col items-center pt-20 ">
      <Link to={'/'} className="text-2xl font-bold text-center mb-5">
        AuthLayout
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
