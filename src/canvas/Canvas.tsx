import { useState } from "react";
import Block from "../components/Block";
import { BlockType } from "../types";

const Canvas = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([
    {
      id: "b1",
      name: "Battery",
      x: 100,
      y: 100,
      parameters: [
        { id: "p1", name: "Voltage", value: "12", unit: "V" },
        { id: "p2", name: "Capacity", value: "5000", unit: "mAh" },
      ],
    },
  ]);

  const updateBlockPosition = (id: string, x: number, y: number) => {
    console.log("MOVE", id, x, y); // 🐞 DEBUG
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  };

  const handleAddBlock = () => {
    const newBlock: BlockType = {
      id: crypto.randomUUID(),
      name: `Block ${blocks.length + 1}`,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      parameters: [
        {
          id: crypto.randomUUID(),
          name: "param1",
          value: "",
          unit: "",
        },
      ],
    };

    setBlocks((prev) => [...prev, newBlock]);
  };

  const handleChangeParam = (
    blockId: string,
    paramId: string,
    field: "name" | "value" | "unit",
    value: string
  ) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              parameters: block.parameters.map((param) =>
                param.id === paramId ? { ...param, [field]: value } : param
              ),
            }
          : block
      )
    );
  };

  const handleAddParam = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId && block.parameters.length < 5
          ? {
              ...block,
              parameters: [
                ...block.parameters,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  value: "",
                  unit: "",
                },
              ],
            }
          : block
      )
    );
  };

  const handleDeleteParam = (blockId: string, paramId: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              parameters: block.parameters.filter((p) => p.id !== paramId),
            }
          : block
      )
    );
  };

  return (
    <div className="relative w-full h-screen   overflow-hidden text-black">
      <button
        onClick={handleAddBlock}
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 z-10"
      >
        + Add Block
      </button>
      {blocks.map((block) => (
        <Block
          key={block.id}
          {...block}
          onDrag={updateBlockPosition}
          onChangeParam={handleChangeParam}
          onAddParam={handleAddParam}
          onDeleteParam={handleDeleteParam}
        />
      ))}
    </div>
  );
};

export default Canvas;
