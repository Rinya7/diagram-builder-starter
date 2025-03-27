import { FC, useRef, useState, useEffect, useCallback } from "react";
import { BlockProps } from "../types";

const Block: FC<BlockProps> = ({ id, name, x, y, onDrag, parameters }) => {
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
        <div className="font-bold text-sm">{name}</div>
        {parameters.map((param) => (
          <div key={param.id} className="text-xs mt-1">
            <span className="font-semibold">{param.name}</span>: {param.value}{" "}
            {param.unit}
          </div>
        ))}
      </div>
    </>
  );
};

export default Block;
