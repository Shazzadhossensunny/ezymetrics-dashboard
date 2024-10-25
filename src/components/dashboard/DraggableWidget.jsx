import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import WidgetContent from './WidgetContent';

const DraggableWidget = ({ widget, index, isCustomizing, onToggle, moveWidget }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'WIDGET',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isCustomizing,
  });

  const [, drop] = useDrop({
    accept: 'WIDGET',
    hover: (item) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveWidget(dragIndex, hoverIndex); // Move widget position
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`bg-white p-4 rounded-lg shadow ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: isCustomizing ? 'move' : 'default' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{widget.title}</h3>
        {isCustomizing && (
          <button
            onClick={onToggle}
            className="text-sm px-2 py-1 bg-gray-100 rounded"
          >
            Remove
          </button>
        )}
      </div>
      <WidgetContent widgetId={widget.id} />
    </div>
  );
};

export default DraggableWidget;
