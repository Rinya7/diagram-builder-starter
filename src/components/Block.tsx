import { FC, useRef, useState, useEffect, useCallback } from "react";
import { BlockProps } from "../types";

const Block: FC<BlockProps> = ({
  id,
  name,
  x,
  y,
  onDrag,
  parameters,
  onChangeParam,
  onAddParam,
  onDeleteParam,
  onChangeEquation,
  onDeleteBlock,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = blockRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      onDrag?.(id, newX, newY);
    },
    [isDragging, offset, id, onDrag]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <>
      <div
        ref={blockRef}
        onMouseDown={handleMouseDown}
        className="absolute p-3 bg-white rounded border shadow cursor-move select-none z-10"
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteBlock?.(id);
          }}
          className="absolute top-1 right-1 text-sm text-gray-500 hover:text-red-600"
        >
          ✖
        </button>
        <div className="font-bold text-sm">{name}</div>
        {parameters.map((param) => (
          <div key={param.id} className="flex gap-1 mt-1 items-center">
            <input
              type="text"
              value={param.name}
              onChange={(e) =>
                onChangeParam?.(id, param.id, "name", e.target.value)
              }
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="Name"
              className="border px-1 w-20 text-xs rounded"
            />
            <input
              type="text"
              value={param.value}
              onChange={(e) =>
                onChangeParam?.(id, param.id, "value", e.target.value)
              }
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="Value"
              className="border px-1 w-14 text-xs rounded"
            />
            <input
              type="text"
              value={param.unit}
              onChange={(e) =>
                onChangeParam?.(id, param.id, "unit", e.target.value)
              }
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="Unit"
              className="border px-1 w-10 text-xs rounded"
            />
            <button
              onClick={() => onDeleteParam?.(id, param.id)}
              className="text-red-500 text-xs ml-1 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
        {parameters.length < 5 && (
          <button
            onClick={() => onAddParam?.(id)}
            className="text-xs text-blue-600 mt-2 hover:underline"
          >
            ➕ Add Parameter
          </button>
        )}
      </div>
    </>
  );
};

export default Block;
