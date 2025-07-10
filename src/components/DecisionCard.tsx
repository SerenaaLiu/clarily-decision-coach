
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DecisionCardProps {
  title: string;
  lastActivity: string;
  status: string;
  isCompleted?: boolean;
  onClick: () => void;
}

export const DecisionCard = ({ title, lastActivity, status, isCompleted = false, onClick }: DecisionCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                {isCompleted ? "Completed:" : "Last Meeting:"} {lastActivity}
              </p>
              <Badge 
                variant={isCompleted ? "secondary" : "default"}
                className={isCompleted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
              >
                {status}
              </Badge>
            </div>
            
            <Button variant="outline" size="sm" className="ml-4">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
