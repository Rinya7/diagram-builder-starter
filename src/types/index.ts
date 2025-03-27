export type Parameter = {
  id: string;
  name: string;
  value: string;
  unit: string;
};

export type BlockType = {
  id: string;
  name: string;
  x: number;
  y: number;
  parameters: Parameter[];
  type: "normal" | "constraint";
  equation?: string; // лише для constraint
};

export type BlockProps = {
  id: string;
  name: string;
  x: number;
  y: number;
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
};

export const UNIT_OPTIONS = ["V", "A", "W", "Ohm", "kg", "N", "m", "m/s²"];

export type Connection = {
  from: string; // blockId
  to: string; // blockId
};
