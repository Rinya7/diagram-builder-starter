export type Parameter = {
  id: string;
  name: string;
  value?: string;
  unit: string;
};

export type NormalBlockType = {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "normal";
  parameters: Parameter[]; // має value
};

export type ConstraintBlockType = {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "constraint";
  equation: string;
  parameters: Parameter[]; // тільки name + unit
};

export type BlockType = NormalBlockType | ConstraintBlockType;

export type BlockProps = {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "normal" | "constraint";
  parameters: Parameter[];
  equation?: string;
  onDrag?: (id: string, x: number, y: number) => void;
  onChangeParam?: (
    blockId: string,
    paramId: string,
    field: "name" | "value" | "unit",
    value: string
  ) => void;
  onAddParam?: (blockId: string) => void;
  onDeleteParam?: (blockId: string, paramId: string) => void;
  onChangeEquation?: (blockId: string, equation: string) => void;
  onDeleteBlock?: (blockId: string) => void;
  onPortClick?: (blockId: string) => void;
  onChangeName?: (blockId: string, newName: string) => void;
};

//export type BlockType = {
//  id: string;
//  name: string;
//  x: number;
//  y: number;
//  parameters: Parameter[];
//  type: "normal" | "constraint";
//  equation?: string; // лише для constraint
//};

//export type BlockProps = {
//  id: string;
//  name: string;
//  x: number;
//  y: number;
//  parameters: Parameter[];
//  equation?: string;
//  onDrag?: (id: string, x: number, y: number) => void;
//  onChangeParam?: (
//    blockId: string,
//    paramId: string,
//    field: "name" | "value" | "unit",
//    value: string
//  ) => void;
//  onAddParam?: (blockId: string) => void;
//  onDeleteParam?: (blockId: string, paramId: string) => void;
//  onChangeEquation?: (blockId: string, equation: string) => void;
//  onDeleteBlock?: (blockId: string) => void;
//  onPortClick?: (blockId: string) => void;
//  onChangeName?: (blockId: string, newName: string) => void;
//};

export type UnitType =
  | "V"
  | "A"
  | "W"
  | "Ohm"
  | "kg"
  | "N"
  | "m"
  | "m/s²"
  | "hour"
  | "kilometre"
  | "kilometre per hour"
  | "watt"
  | "watt hour";

export const UNIT_OPTIONS: UnitType[] = [
  "V",
  "A",
  "W",
  "Ohm",
  "kg",
  "N",
  "m",
  "m/s²",
  "hour",
  "kilometre",
  "kilometre per hour",
  "watt",
  "watt hour",
];

export type Connection = {
  from: string; // blockId
  to: string; // blockId
};
