import { useState } from "react";

type ChoiceBarsProps = {
  choices: string[];
  onChoiceSelect: (choice: string) => void; // <-- callback
};

export function ChoiceBars({ choices, onChoiceSelect }: ChoiceBarsProps) {
  const [chosen, setChosen] = useState<number>(-1);

  return (
    <div className="flex flex-row gap-4 px-1 my-3">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => {
            setChosen(index);
            onChoiceSelect(choice); // send selected choice up
          }}
          className={`hover:text-black text-sm bg-white font-semibold ${
            chosen === index
              ? "text-black border-b-[3px] border-b-[#0156FF] transition ease-linear duration-700 leading-5"
              : "text-gray-500"
          }`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}
