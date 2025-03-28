// 💡 Тип для одиниць виміру
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

// 🧩 Для dropdown'а
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

// 🧱 Параметр
export type Parameter = {
  id: string;
  name: string;
  value?: string; // тільки для normal
  unit: string;
};

// 📦 Базова структура блока
export type BaseBlock = {
  id: string;
  name: string;
  x: number;
  y: number;
  parameters: Parameter[];
  type: "normal" | "constraint";
  equation?: string;
  transformed?: boolean;
};

// 📦 Стейт-блок (у useState, БД тощо)
export type BlockType = BaseBlock;

// 🔧 Пропси для компонента <Block />
export type BlockProps = BaseBlock & {
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

// 🔗 З'єднання між блоками
export type Connection = {
  from: string; // blockId
  to: string; // blockId
};
