import { Task } from "@/models/task_model";
import { Zap, Navigation, LucideIcon, User, Car } from "lucide-react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  draggableProps: DraggableProvidedDraggableProps;
  innerRef: React.Ref<HTMLDivElement>;
}

interface StepStyle {
  icon: LucideIcon;
  color: string;
}

const getStyleForStep = (step: string): StepStyle => {
  switch (step) {
    case "vehicle":
      return {
        icon: Car,
        color: "text-purple-600",
      };
    case "charging":
      return {
        icon: Zap,
        color: "text-emerald-600",
      };
    case "destination":
      return {
        icon: Navigation,
        color: "text-blue-600",
      };
    default:
      return {
        icon: User,
        color: "text-gray-500",
      };
  }
};

export function TaskCard({
  task,
  dragHandleProps,
  draggableProps,
  innerRef,
}: TaskCardProps) {
  const { icon: Icon, color } = getStyleForStep(task.step);

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="mb-1"
    >
      <div className="flex items-center space-x-4 rounded-md border pl-3 pr-4 pt-3.5 pb-3 backdrop-blur-md bg-white/60">
        <div className="flex-1 flex items-center space-x-2">
          <div className="flex items-center justify-center">
            <Icon className={color + " w-5 h-5 mr-1"} />
          </div>
          <div>
            <p className="text-sm font-medium leading-none mb-0.5">
              {task.title}
            </p>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
