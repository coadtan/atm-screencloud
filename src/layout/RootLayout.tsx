import { Link, Outlet } from '@tanstack/router';

export const RootLayout: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/atm">ATM</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
};
