import { Badge } from "@/components/ui/badge";
import { IssueStatus, Priority } from "@/types/civic";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    new: {
      label: "New",
      className: "bg-status-new text-status-new-foreground hover:bg-status-new/80"
    },
    acknowledged: {
      label: "Acknowledged", 
      className: "bg-status-acknowledged text-status-acknowledged-foreground hover:bg-status-acknowledged/80"
    },
    "in-progress": {
      label: "In Progress",
      className: "bg-status-in-progress text-status-in-progress-foreground hover:bg-status-in-progress/80"
    },
    resolved: {
      label: "Resolved",
      className: "bg-status-resolved text-status-resolved-foreground hover:bg-status-resolved/80"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const priorityConfig = {
    urgent: {
      label: "Urgent",
      className: "bg-priority-urgent text-priority-urgent-foreground hover:bg-priority-urgent/80"
    },
    high: {
      label: "High",
      className: "bg-priority-high text-priority-high-foreground hover:bg-priority-high/80"
    },
    medium: {
      label: "Medium", 
      className: "bg-priority-medium text-priority-medium-foreground hover:bg-priority-medium/80"
    },
    low: {
      label: "Low",
      className: "bg-priority-low text-priority-low-foreground hover:bg-priority-low/80"
    }
  };

  const config = priorityConfig[priority];

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}