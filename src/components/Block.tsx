import { FC, useEffect, useRef, useState } from "react";

type BlockProps = {
  id: string;
  name: string;
  x: number;
  y: number;
  onDrag?: (id: string, x: number, y: number) => void;
};

const Block: FC<BlockProps> = ({ id, name, x, y, onDrag }) => {
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

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    onDrag?.(id, newX, newY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={blockRef}
      onMouseDown={handleMouseDown}
      className="absolute p-3 bg-white rounded border shadow cursor-move select-none z-10"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div className="font-bold text-sm">{name}</div>
    </div>
  );
};

export default Block;
