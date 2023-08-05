import { Outlet } from '@tanstack/router';
import { ResetEverything } from '../components/ResetEverything';
import { NoteNumber } from '../components/NoteNumber';

export const RootLayout: React.FC = () => {
  return (
    <>
      <div className="m-16 mx-auto flex w-fit flex-col gap-12">
        <Outlet />
        <div className="flex flex-col gap-2 bg-gray-300 p-4">
          <p>ATM Zone - Users do not see this area 🥷</p>
          <NoteNumber />
          <ResetEverything />
        </div>
      </div>
    </>
  );
};
