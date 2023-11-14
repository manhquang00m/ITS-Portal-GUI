import { Select } from "@chakra-ui/react";

export interface IOptionSelectComp {
    value: string,
    name: string
}

interface ISelectComp {
    placeholder?: string;
    value?: string | number;
    onChange?: () => void;
    options: IOptionSelectComp[]
}

export default function SelectComp(props: ISelectComp) {
    const { value, onChange, placeholder, options } = props;

    return <Select placeholder={placeholder} value={value} onChange={onChange}>
        {options.map((option, index) => {
            return <option key={index} value={option.value}>{option.name}</option>
        })}
    </Select>
}
