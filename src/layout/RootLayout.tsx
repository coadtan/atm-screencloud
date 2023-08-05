import { Outlet } from '@tanstack/router';
import { ResetEverything } from '../components/ResetEverything';
import { NoteNumber } from '../components/NoteNumber';
import { useAuthStore } from '../stores/authStore';

export const RootLayout: React.FC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <div className="m-16 mx-auto flex w-fit flex-col gap-12">
        <Outlet />
        <div className="flex flex-col gap-2 bg-gray-300 p-4">
          <p>ATM Zone - Users do not see this area 🥷</p>
          <p>
            Authentication Status:{' '}
            {isAuth ? (
              <span className="text-green-500">authenticated</span>
            ) : (
              <span className="text-red-500">unauthenticated</span>
            )}
          </p>
          <NoteNumber />
          <ResetEverything />
        </div>
      </div>
    </>
  );
};
