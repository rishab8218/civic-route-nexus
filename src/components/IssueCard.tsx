import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { CivicIssue } from "@/types/civic";
import { MapPin, Clock, User, Building } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface IssueCardProps {
  issue: CivicIssue;
  onClick?: (issue: CivicIssue) => void;
}

const categoryLabels = {
  pothole: "Pothole",
  streetlight: "Street Light",
  trash: "Trash/Sanitation",
  graffiti: "Graffiti",
  "water-leak": "Water Leak",
  "traffic-signal": "Traffic Signal",
  "park-maintenance": "Park Maintenance",
  other: "Other"
};

const departmentLabels = {
  "public-works": "Public Works",
  sanitation: "Sanitation",
  "parks-recreation": "Parks & Recreation",
  traffic: "Traffic",
  utilities: "Utilities",
  "code-enforcement": "Code Enforcement"
};

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const timeAgo = formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true });

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
      onClick={() => onClick?.(issue)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {issue.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>
          </div>
          {issue.photos.length > 0 && (
            <img 
              src={issue.photos[0]} 
              alt="Issue photo"
              className="w-12 h-12 object-cover rounded-md flex-shrink-0"
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {issue.description}
        </p>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="line-clamp-1">{issue.location.address}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3 flex-shrink-0" />
            <span>{issue.reportedBy.name}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span>{timeAgo}</span>
          </div>
          
          {issue.assignedTo && (
            <div className="flex items-center gap-1.5">
              <Building className="w-3 h-3 flex-shrink-0" />
              <span>
                {departmentLabels[issue.assignedTo.department]}
                {issue.assignedTo.staffMember && ` • ${issue.assignedTo.staffMember}`}
              </span>
            </div>
          )}
        </div>
        
        <div className="pt-2 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground">
            {categoryLabels[issue.category]}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}