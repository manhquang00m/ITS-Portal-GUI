import { ReactNode } from "react";
export interface IFilterInput {
  type: "inputText" | "select";
  label?: string;
  controlName: string;
  placeHolder?: string;
  selected?: boolean;
}

export interface IFilter {
  rightButton?: ReactNode;
  filterItems: IFilterInput[];
  searchParams: any;
  handleSearch: (params: any) => void;
  initialValue?: Record<string, unknown | undefined>;
}
