import { FC, useRef, useState, useEffect, useCallback } from "react";
import { BlockProps } from "../types";

const ConstraintBlock: FC<BlockProps> = ({
  id,
  name,
  x,
  y,
  parameters,
  equation = "",
  onDrag,
  onChangeParam,
  onAddParam,
  onDeleteParam,
  onChangeEquation,
  onDeleteBlock,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      onDrag?.(id, e.clientX - offset.x, e.clientY - offset.y);
    },
    [isDragging, offset, id, onDrag]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className="absolute p-3 bg-blue-100 border-2 border-blue-500 rounded shadow z-10"
      style={{ left: x, top: y }}
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
      <div className="font-bold text-sm text-blue-800">{name} (Constraint)</div>

      <input
        type="text"
        value={equation}
        onChange={(e) => onChangeEquation?.(id, e.target.value)}
        placeholder="Equation (e.g. F = m * a)"
        className="w-full mt-2 border px-1 py-0.5 text-xs rounded"
        onMouseDown={(e) => e.stopPropagation()}
      />

      {parameters.map((param) => (
        <div key={param.id} className="flex gap-1 mt-1 items-center">
          <input
            type="text"
            value={param.name}
            onChange={(e) =>
              onChangeParam?.(id, param.id, "name", e.target.value)
            }
            className="border px-1 w-20 text-xs rounded"
            placeholder="Name"
            onMouseDown={(e) => e.stopPropagation()}
          />
          <input
            type="text"
            value={param.unit}
            onChange={(e) =>
              onChangeParam?.(id, param.id, "unit", e.target.value)
            }
            className="border px-1 w-14 text-xs rounded"
            placeholder="Unit"
            onMouseDown={(e) => e.stopPropagation()}
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
          className="text-xs text-blue-700 mt-2 hover:underline"
        >
          ➕ Add Parameter
        </button>
      )}
    </div>
  );
};

export default ConstraintBlock;
