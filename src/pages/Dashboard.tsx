import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IssueCard } from "@/components/IssueCard";
import { StatusBadge } from "@/components/StatusBadge";
import { sampleIssues, dashboardStats } from "@/data/sampleData";
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users,
  Calendar,
  MapPin
} from "lucide-react";

const statsCards = [
  {
    title: "Total Reports",
    value: dashboardStats.totalReports,
    icon: FileText,
    description: "All time reports",
    trend: "+12% from last month"
  },
  {
    title: "New Reports",
    value: dashboardStats.newReports,
    icon: AlertTriangle,
    description: "Awaiting review",
    trend: "5 urgent priority"
  },
  {
    title: "In Progress",
    value: dashboardStats.inProgress,
    icon: Clock,
    description: "Currently assigned",
    trend: `${dashboardStats.averageResponseTime}h avg response`
  },
  {
    title: "Resolved Today",
    value: dashboardStats.resolvedToday,
    icon: CheckCircle,
    description: "Completed issues",
    trend: "+3 from yesterday"
  }
];

export default function Dashboard() {
  const recentIssues = sampleIssues
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const urgentIssues = sampleIssues.filter(issue => 
    issue.priority === 'urgent' && issue.status !== 'resolved'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Municipal issue management overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <p className="text-xs text-primary mt-1">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Issues */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {recentIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onClick={(issue) => console.log('Navigate to issue:', issue.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Urgent Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-priority-urgent">
                <AlertTriangle className="h-5 w-5" />
                Urgent Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentIssues.length > 0 ? (
                urgentIssues.map((issue) => (
                  <div 
                    key={issue.id}
                    className="p-3 border border-priority-urgent/20 rounded-lg bg-priority-urgent/5"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {issue.title}
                      </h4>
                      <StatusBadge status={issue.status} />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{issue.location.address}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No urgent issues at the moment.</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Assignment</span>
                <span className="font-semibold">{dashboardStats.pendingAssignment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <span className="font-semibold">{dashboardStats.averageResponseTime}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Resolution Rate</span>
                <span className="font-semibold text-status-resolved">
                  {Math.round((dashboardStats.resolved / dashboardStats.totalReports) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Department Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Department Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Public Works</span>
                  <span className="text-status-in-progress">12 active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Utilities</span>
                  <span className="text-status-in-progress">14 active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sanitation</span>
                  <span className="text-status-in-progress">8 active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Parks & Rec</span>
                  <span className="text-status-resolved">3 active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}