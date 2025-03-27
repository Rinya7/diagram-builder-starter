import { useState } from "react";
import Block from "../components/Block";

type BlockType = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const Canvas = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([
    { id: "b1", name: "Battery", x: 100, y: 100 },
    { id: "b2", name: "Power", x: 300, y: 150 },
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
      x: Math.random() * 400 + 100, // випадкова позиція
      y: Math.random() * 300 + 100,
    };

    setBlocks((prev) => [...prev, newBlock]);
  };

  return (
    <div className="relative w-full h-screen   overflow-hidden">
      <button
        onClick={handleAddBlock}
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 z-10"
      >
        + Add Block
      </button>
      {blocks.map((block) => (
        <Block key={block.id} {...block} onDrag={updateBlockPosition} />
      ))}
    </div>
  );
};

export default Canvas;
