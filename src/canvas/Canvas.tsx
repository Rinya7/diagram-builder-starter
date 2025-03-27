import { useState } from "react";
import Block from "../components/Block";
import { BlockType } from "../types";
import ConstraintBlock from "../components/ConstraintBlock";

const Canvas = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingConnection, setPendingConnection] = useState<string | null>(
    null
  );

  const [blocks, setBlocks] = useState<BlockType[]>([
    {
      id: "b1",
      name: "Battery",
      x: 100,
      y: 100,
      type: "normal",
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
      type: "normal", // ✅ додаємо тип
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

  const handleAddConstraintBlock = () => {
    const newBlock: BlockType = {
      id: crypto.randomUUID(),
      name: `Constraint ${blocks.length + 1}`,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      parameters: [],
      equation: "",
      type: "constraint",
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== blockId));
    setConnections((prev) =>
      prev.filter((c) => c.from !== blockId && c.to !== blockId)
    );
  };

  const handlePortClick = (blockId: string) => {
    if (pendingConnection && pendingConnection !== blockId) {
      setConnections((prev) => [
        ...prev,
        { from: pendingConnection, to: blockId },
      ]);
      setPendingConnection(null);
    } else {
      setPendingConnection(blockId);
    }
  };

  return (
    <div className="relative w-full h-screen   overflow-hidden text-black">
      <button
        onClick={handleAddBlock}
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 z-10"
      >
        + Add Block
      </button>
      <button
        onClick={handleAddConstraintBlock}
        className="absolute top-4 left-44 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 z-10"
      >
        + Constraint Block
      </button>

      {blocks.map((block) =>
        block.type === "constraint" ? (
          <ConstraintBlock
            key={block.id}
            {...block}
            onDrag={updateBlockPosition}
            onChangeParam={handleChangeParam}
            onAddParam={handleAddParam}
            onDeleteParam={handleDeleteParam}
            //  onChangeEquation={handleChangeEquation}
            onDeleteBlock={handleDeleteBlock}
            onPortClick={handlePortClick}
          />
        ) : (
          <Block
            key={block.id}
            {...block}
            onDrag={updateBlockPosition}
            onChangeParam={handleChangeParam}
            onAddParam={handleAddParam}
            onDeleteParam={handleDeleteParam}
            onDeleteBlock={handleDeleteBlock}
            onPortClick={handlePortClick}
          />
        )
      )}
      <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {connections.map((conn, i) => {
          const from = blocks.find((b) => b.id === conn.from);
          const to = blocks.find((b) => b.id === conn.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x + 75} // центр блока
              y1={from.y}
              x2={to.x + 75}
              y2={to.y}
              stroke="black"
              strokeWidth={2}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Canvas;
