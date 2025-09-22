import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, sampleIssues } from "@/data/sampleData";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MapPin,
  Users,
  Calendar
} from "lucide-react";

export default function Analytics() {
  // Calculate analytics data
  const categoryBreakdown = sampleIssues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusBreakdown = sampleIssues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentWorkload = sampleIssues
    .filter(issue => issue.assignedTo)
    .reduce((acc, issue) => {
      const dept = issue.assignedTo!.department;
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const categoryLabels = {
    pothole: "Potholes",
    streetlight: "Street Lights", 
    trash: "Trash/Sanitation",
    graffiti: "Graffiti",
    "water-leak": "Water Leaks",
    "traffic-signal": "Traffic Signals",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Trends</h1>
        <p className="text-muted-foreground">
          Performance insights and reporting trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-resolved">
              {Math.round((dashboardStats.resolved / dashboardStats.totalReports) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.resolved} of {dashboardStats.totalReports} resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.averageResponseTime}h</div>
            <p className="text-xs text-muted-foreground">
              Down from 24h last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-in-progress">
              {dashboardStats.newReports + dashboardStats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Utilization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Average workload
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Issue Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Issues by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryBreakdown)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: `${(count / Math.max(...Object.values(categoryBreakdown))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusBreakdown).map(([status, count]) => {
                const statusColors = {
                  new: "bg-status-new",
                  acknowledged: "bg-status-acknowledged",
                  "in-progress": "bg-status-in-progress",
                  resolved: "bg-status-resolved"
                };
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">
                      {status.replace('-', ' ')}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${statusColors[status as keyof typeof statusColors]}`}
                          style={{ 
                            width: `${(count / sampleIssues.length) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Department Workload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Department Workload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(departmentWorkload)
                .sort(([,a], [,b]) => b - a)
                .map(([dept, count]) => (
                <div key={dept} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {departmentLabels[dept as keyof typeof departmentLabels]}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: `${(count / Math.max(...Object.values(departmentWorkload))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Response Time</span>
              <span className="text-sm font-semibold text-status-resolved">-23% ↓</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Resolution Rate</span>
              <span className="text-sm font-semibold text-status-resolved">+15% ↑</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Citizen Satisfaction</span>
              <span className="text-sm font-semibold text-status-resolved">+8% ↑</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Report Volume</span>
              <span className="text-sm font-semibold text-status-acknowledged">+12% ↑</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}