import React from 'react';
import { useNoteStore } from '../stores/noteStore';

export const NoteNumber: React.FC = () => {
  const { fiveEuroNum, tenEuroNum, twentyEuroNum } = useNoteStore(
    (state) => state.noteNumber,
  );
  const getRemainingAtmBalance = useNoteStore(
    (state) => state.getRemainingAtmBalance,
  );

  return (
    <div>
      <p>Remaining Note</p>
      <table className="text-left">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="px-6 "
            >
              Note
            </th>
            <th
              scope="col"
              className="px-6 "
            >
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-6">£5</td>
            <td className="px-6 ">{fiveEuroNum}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6">£10</td>
            <td className="px-6 ">{tenEuroNum}</td>
          </tr>
          <tr className="border-b">
            <td className="px-6">£20</td>
            <td className="px-6 ">{twentyEuroNum}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-4">
        Remaining ATM Balance:{' '}
        <span className="font-bold">£{getRemainingAtmBalance()}</span>
      </p>
    </div>
  );
};
