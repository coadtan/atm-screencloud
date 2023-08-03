import { Outlet } from '@tanstack/router';
import { AtmInput } from '../components/AtmInput';
import { AtmScreen } from '../components/AtmScreen';

export const RootLayout: React.FC = () => {
  return (
    <>
      <div className="m-16 mx-auto flex w-fit flex-col gap-16">
        <AtmScreen>
          <Outlet />
        </AtmScreen>
        <AtmInput />
      </div>
    </>
  );
};
