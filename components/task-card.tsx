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
} from "lucide-react";
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
        color: "text-red-600",
      };
    case "get_places:fastfood":
      return {
        icon: SquareDashedMousePointer,
        color: "text-red-600",
      };
    case "get_routes:destination_with_fastfood-route_1":
      return {
        icon: Route,
        color: "text-amber-600",
      };
    case "search_web_content:web-search":
      return {
        icon: Globe,
        color: "text-teal-600",
      };
    case "get_places:charging-place_with_restaurant_1":
      return {
        icon: UtensilsCrossed,
        color: "text-red-600",
      };
    case "get_calendar:next_event":
      return {
        icon: Calendar,
        color: "text-fuchsia-600",
      };
    case "search_email_content:email-search":
      return {
        icon: Mail,
        color: "text-fuchsia-600",
      };
    case "calculate_distance:destination-route_1":
      return {
        icon: Calculator,
        color: "text-violet-600",
      };
    case "get_contact:name":
      return {
        icon: User,
        color: "text-red-600",
      };
    case "search_places:charging-place_1":
      return {
        icon: SquareDashedMousePointer,
        color: "text-red-600",
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
      <div className="flex items-center space-x-4 rounded-md border pl-3 pr-4 pt-3.5 pb-3 backdrop-blur-md bg-white/90">
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
