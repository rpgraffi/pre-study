import { Task } from "@/models/task_model";
import {
  Zap,
  LucideIcon,
  User,
  Car,
  Route,
  SquareDashedMousePointer,
  Goal,
  Utensils,
  Globe,
  UtensilsCrossed,
  Calendar,
  Mail,
  Calculator,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  draggableProps: DraggableProvidedDraggableProps;
  innerRef: React.Ref<HTMLDivElement>;
  column?: string;
  onToggleAuditive?: (taskId: string, value: boolean) => void;
}

interface StepStyle {
  icon: LucideIcon;
  color: string;
}

const getStyleForStep = (step: string): StepStyle => {
  switch (step) {
    case "get_vehicle_state:adress":
      return {
        icon: Car,
        color: "text-zinc-600",
      };
    case "get_routes:destination":
      return {
        icon: SquareDashedMousePointer,
        color: "text-blue-600",
      };
    case "get_routes:destination-route_1":
      return {
        icon: Route,
        color: "text-blue-600",
      };
    case "get_places:charging":
      return {
        icon: SquareDashedMousePointer,
        color: "text-emerald-600",
      };
    case "get_places:charging-place_1":
      return {
        icon: Zap,
        color: "text-emerald-600",
      };
    case "get_routes:destination_with_charging":
      return {
        icon: SquareDashedMousePointer,
        color: "text-red-600",
      };
    case "get_routes:destination_with_charging-route_1":
      return {
        icon: Goal,
        color: "text-red-600",
      };
    case "destination":
      return {
        icon: SquareDashedMousePointer,
        color: "text-amber-600",
      };
    case "get_places:fastfood-place_1":
      return {
        icon: Utensils,
        color: "text-green-600",
      };
    case "get_places:fastfood":
      return {
        icon: SquareDashedMousePointer,
        color: "text-green-600",
      };
    case "get_routes:destination_with_fastfood-route_1":
      return {
        icon: Route,
        color: "text-amber-600",
      };
    case "search_web_content:web-search":
      return {
        icon: Globe,
        color: "text-fuchsia-600",
      };
    case "get_places:charging-place_with_restaurant_1":
      return {
        icon: UtensilsCrossed,
        color: "text-green-600",
      };
    case "get_calendar:next_event":
      return {
        icon: Calendar,
        color: "text-red-600",
      };
    case "search_email_content:email-search":
      return {
        icon: Mail,
        color: "text-fuchsia-600",
      };
    case "calculate_distance:destination-route_1":
      return {
        icon: Calculator,
        color: "text-yellow-600",
      };
    case "get_contact:name":
      return {
        icon: User,
        color: "text-red-600",
      };
    case "search_places:charging-place_1":
      return {
        icon: SquareDashedMousePointer,
        color: "text-green-600",
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
  column,
  onToggleAuditive,
}: TaskCardProps) {
  const { icon: Icon, color } = getStyleForStep(task.step);
  const [isHovered, setIsHovered] = useState(false);

  const isAuditivColumn = column === "essential";
  const showToggle = isAuditivColumn && (isHovered || task.isAuditivVisible);

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleAuditive) {
      onToggleAuditive(task.id, !task.isAuditivVisible);
    }
  };

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="mb-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4 rounded-md border pl-3 pr-4 pt-3.5 pb-3 backdrop-blur-md bg-white/90 relative">
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

        {isAuditivColumn && (
          <div
            className={`absolute right-2 top-2 cursor-pointer ${
              showToggle ? "opacity-100" : "opacity-0"
            } transition-opacity`}
            onClick={handleToggleClick}
          >
            {task.isAuditivVisible ? (
              <Eye className="h-4 w-4 text-blue-500" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
