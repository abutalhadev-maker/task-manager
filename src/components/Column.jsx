import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ name, tasks, onDelete, setEditingTask, setEditingColumn })
 {
  return (
    <div style={{ width: 300 }}>
      <h3>{name}</h3>

      <Droppable droppableId={name}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, i) => (
              <Draggable key={task.id} draggableId={task.id} index={i}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                  >
                    <TaskCard
  task={task}
  onDelete={() => onDelete(name, task.id)}
  onEdit={() => {
    setEditingTask(task);
    setEditingColumn(name);
  }}
/>

                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
