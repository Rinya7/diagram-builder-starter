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
};

export type BlockProps = {
  id: string;
  name: string;
  x: number;
  y: number;
  onDrag?: (id: string, x: number, y: number) => void;
  parameters: Parameter[];
  onChangeParam?: (
    blockId: string,
    paramId: string,
    field: "name" | "value" | "unit",
    value: string
  ) => void;
};
