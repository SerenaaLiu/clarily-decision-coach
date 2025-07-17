
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";

interface DecisionCardProps {
  title: string;
  lastActivity: string;
  onClick: () => void;
  onArchive: () => void;
}

export const DecisionCard = ({ title, lastActivity, onClick, onArchive }: DecisionCardProps) => {
  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive();
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer relative" onClick={onClick}>
      <CardContent className="p-6">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-60 hover:opacity-100"
          onClick={handleArchive}
        >
          <Archive className="h-4 w-4" />
        </Button>
        
        <div className="space-y-3 pr-8">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Last Meeting: {lastActivity}
            </p>
            
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
