import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IOptionSelectComp } from "./SelectField";

interface ISelectRemote {
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  getOptions?: () => Promise<IOptionSelectComp[]>;
  className?: string;
}

export default function SelectRemote(props: ISelectRemote) {
  const { value, onChange, placeholder, getOptions, className } = props;
  const [options, setOptions] = useState<IOptionSelectComp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOptions();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, [getOptions]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <Select
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={handleSelectChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}
