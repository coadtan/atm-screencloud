import { Outlet } from '@tanstack/router';
import { ResetEverything } from '../components/ResetEverything';

export const RootLayout: React.FC = () => {
  return (
    <>
      <div className="m-16 mx-auto flex w-fit flex-col gap-16">
        <Outlet />
        <ResetEverything />
      </div>
    </>
  );
};
