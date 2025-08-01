interface AddressInputProps {
  title: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}


export function Addressinput({ title, placeholder, type, value, error,onChange }: AddressInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-semibold text-[14px]">
        {title} <span className="text-red-700 text-lg">*</span>
      </h4>
      <input
  value={value}
  onChange={onChange}
  type={type}
  placeholder={placeholder}
  className={`rounded-md p-2 border ${
    error ? "border-red-500" : "border-[#A2A6B0]"
  }`}
/>
{error && <span className="text-red-500 text-sm">This field is required</span>}

    </div>
  );
}
