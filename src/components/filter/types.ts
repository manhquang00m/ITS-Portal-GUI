import { IOptionSelectComp } from "components/fields/SelectField";
import { ReactNode } from "react";
export interface IFilterInput {
  type: "inputText" | "select" | "selectRemote";
  label?: string;
  controlName: string;
  placeHolder?: string;
  selected?: boolean;
  defaultValue?: string | number;
  keyRefetch?: string;
  getOptions?: () => Promise<IOptionSelectComp[]>;
}

export interface IFilter {
  rightButton?: ReactNode;
  filterItems: IFilterInput[];
  searchParams: any;
  handleSearch: (params: any) => void;
  initialValue?: Record<string, unknown | undefined>;
}
