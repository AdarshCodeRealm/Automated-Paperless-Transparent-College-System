import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

export function ApplicationDetail({ application }) {
  const totalStages = application.type === "event" ? 3 : 4;
  const approvedStages = application.approvalStages.filter((stage) => stage.status === "approved").length;
  const progress = (approvedStages / totalStages) * 100;

  return (
    <div className="container px-4 py-6 max-w-4xl">
      <Card>
        <CardHeader className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{application.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                Submitted by {application.submittedBy.name} ({application.submittedBy.email})
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={application.priority === "high" ? "destructive" : "secondary"}>
                {application.priority}
              </Badge>
              <Badge
                variant={
                  application.status === "approved"
                    ? "success"
                    : application.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {application.status}
              </Badge>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Application Type</div>
                <div>{application.type === "event" ? "Event Organization" : "Budget Approval"}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Submitted On</div>
                <div>{new Date(application.submittedAt).toLocaleString()}</div>
              </div>
              {application.amount && application.amount > 0 && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Amount</div>
                  <div>${application.amount.toLocaleString()}</div>
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Description</div>
              <div className="mt-1">{application.description}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Approval Stages</h3>
            <div className="space-y-4">
              {application.approvalStages.map((stage, index) => (
                <div key={index} className="relative pl-8">
                  <div
                    className={cn(
                      "absolute left-0 top-2 h-4 w-4 rounded-full border-2",
                      stage.status === "approved" && "bg-green-500 border-green-500",
                      stage.status === "rejected" && "bg-destructive border-destructive",
                      stage.status === "pending" && "border-muted-foreground"
                    )}
                  />
                  {index < application.approvalStages.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-2 top-6 h-full w-0.5 -ml-px",
                        stage.status === "approved" ? "bg-green-500" : "bg-muted"
                      )}
                    />
                  )}
                  <div className="pb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{stage.role}</div>
                        <div className="text-sm text-muted-foreground">
                          {stage.name} ({stage.email})
                        </div>
                      </div>
                      {stage.timestamp && (
                        <div
                          className={cn(
                            "text-sm",
                            stage.status === "approved" && "text-green-500",
                            stage.status === "rejected" && "text-destructive"
                          )}
                        >
                          {new Date(stage.timestamp).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

ApplicationDetail.propTypes = {
  application: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["event", "budget"]).isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    submittedAt: PropTypes.string.isRequired,
    amount: PropTypes.number,
    submittedBy: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    approvalStages: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["approved", "rejected", "pending"]).isRequired,
        timestamp: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
