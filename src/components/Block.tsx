import { FC, useRef, useState, useEffect, useCallback } from "react";
import { BlockProps, UNIT_OPTIONS } from "../types";

const Block: FC<BlockProps> = ({
  id,
  name,
  x,
  y,
  type,
  parameters,
  equation,
  onDrag,
  onChangeParam,
  onChangeName,
  onAddParam,
  onDeleteParam,
  onDeleteBlock,
  onPortClick,
  onChangeEquation,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = blockRef.current?.getBoundingClientRect();
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
      ref={blockRef}
      onMouseDown={handleMouseDown}
      className="group absolute p-3 bg-white rounded border shadow cursor-move select-none z-10"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Порт зверху */}
      <button
        className="w-2 h-2 bg-purple-600 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
        onClick={(e) => {
          e.stopPropagation();
          onPortClick?.(id);
        }}
      />

      {/* Кнопка видалення */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteBlock?.(id);
        }}
        className="absolute top-1 right-1 text-sm text-gray-500 hover:text-red-600"
        title="Delete block"
      >
        ✖
      </button>

      {/* Тип блоку */}
      <div className="text-xs text-gray-400 mb-1">
        {type === "constraint" ? "Constraint Block" : "Block"}
      </div>

      {/* Назва */}
      <input
        type="text"
        value={name}
        onChange={(e) => onChangeName?.(id, e.target.value)}
        placeholder="Block name"
        className="border px-1 text-xs rounded w-full mb-2"
        onMouseDown={(e) => e.stopPropagation()}
      />

      {/* Рівняння для constraint */}
      {type === "constraint" && (
        <input
          type="text"
          value={equation || ""}
          onChange={(e) => onChangeEquation?.(id, e.target.value)}
          placeholder="Equation (e.g. e = P * t)"
          className="border px-1 text-xs rounded w-full mb-2"
          onMouseDown={(e) => e.stopPropagation()}
        />
      )}

      {/* Параметри */}
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

          {/* value — тільки для normal блоків */}
          {type === "normal" && (
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
          )}

          {/* Unit */}
          <select
            value={param.unit}
            onChange={(e) =>
              onChangeParam?.(id, param.id, "unit", e.target.value)
            }
            onMouseDown={(e) => e.stopPropagation()}
            className="border px-1 w-20 text-xs rounded"
          >
            <option value="">–</option>
            {UNIT_OPTIONS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          {/* Видалити параметр */}
          <button
            onClick={() => onDeleteParam?.(id, param.id)}
            className="text-red-500 text-xs ml-1 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      ))}

      {/* Додати параметр — лише до 5 */}
      {parameters.length < 5 && (
        <button
          onClick={() => onAddParam?.(id)}
          className="text-xs text-blue-600 mt-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          ➕ Add Parameter
        </button>
      )}
    </div>
  );
};

export default Block;
