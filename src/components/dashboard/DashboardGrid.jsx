// DashboardGrid.js
import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableWidget from './DraggableWidget';

const DashboardGrid = () => {
  const { widgets, toggleWidget, moveWidget } = useDashboard();
  const [isCustomizing, setIsCustomizing] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isCustomizing ? 'Save Layout' : 'Customize Dashboard'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets
            .filter(widget => widget.enabled)
            .sort((a, b) => a.order - b.order)
            .map((widget, index) => (
              <DraggableWidget
                key={widget.id}
                index={index}
                widget={widget}
                isCustomizing={isCustomizing}
                onToggle={() => toggleWidget(widget.id)}
                moveWidget={moveWidget} // Pass moveWidget function
              />
            ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DashboardGrid;
