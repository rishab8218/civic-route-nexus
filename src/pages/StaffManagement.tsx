import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staffMembers } from "@/data/sampleData";
import { Users, Plus, Mail, Phone, MapPin } from "lucide-react";

const departmentLabels = {
  "public-works": "Public Works",
  sanitation: "Sanitation", 
  "parks-recreation": "Parks & Recreation",
  traffic: "Traffic",
  utilities: "Utilities",
  "code-enforcement": "Code Enforcement"
};

const roleColors = {
  admin: "bg-destructive text-destructive-foreground",
  supervisor: "bg-status-acknowledged text-status-acknowledged-foreground", 
  staff: "bg-muted text-muted-foreground"
};

export default function StaffManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage municipal staff and department assignments
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Staff Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active staff members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(staffMembers.map(s => s.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Active departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Workload</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(staffMembers.reduce((acc, s) => acc + s.assignedIssues, 0) / staffMembers.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Issues per staff member
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Staff Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staffMembers.map((member) => (
              <Card key={member.id} className="border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {departmentLabels[member.department]}
                      </p>
                    </div>
                    <Badge className={roleColors[member.role]}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Assigned Issues</span>
                    <span className="font-semibold text-lg">
                      {member.assignedIssues}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={member.active ? "default" : "secondary"}>
                      {member.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Department Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(
              staffMembers.reduce((acc, member) => {
                if (!acc[member.department]) {
                  acc[member.department] = { count: 0, workload: 0 };
                }
                acc[member.department].count++;
                acc[member.department].workload += member.assignedIssues;
                return acc;
              }, {} as Record<string, { count: number; workload: number }>)
            ).map(([dept, data]) => (
              <div key={dept} className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">
                  {departmentLabels[dept as keyof typeof departmentLabels]}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Staff</span>
                    <div className="font-semibold">{data.count}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Workload</span>
                    <div className="font-semibold">{data.workload}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}