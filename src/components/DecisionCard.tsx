import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveRestore } from "lucide-react";

interface DecisionCardProps {
  title: string;
  lastActivity: string;
  status?: string;
  isCompleted?: boolean;
  onClick: () => void;
  onArchive?: () => void;
  onUnarchive?: () => void;
}

export const DecisionCard = ({ 
  title, 
  lastActivity, 
  status, 
  isCompleted = false, 
  onClick, 
  onArchive,
  onUnarchive
}: DecisionCardProps) => {
  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onArchive?.();
  };

  const handleUnarchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onUnarchive?.();
  };

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200 cursor-pointer relative" onClick={onClick}>
      {/* Archive/Unarchive Button */}
      {onArchive && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
          onClick={handleArchiveClick}
        >
          <Archive className="h-4 w-4" />
        </Button>
      )}
      
      {onUnarchive && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
          onClick={handleUnarchiveClick}
        >
          <ArchiveRestore className="h-4 w-4" />
        </Button>
      )}
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 pr-8">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                {isCompleted ? "Completed:" : "Last Meeting:"} {lastActivity}
              </p>
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
