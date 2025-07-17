import { Button } from "@/components/ui/button";
import { DecisionCard } from "@/components/DecisionCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockArchivedDecisions = [
  {
    id: 4,
    title: "Q3 Budget Allocation",
    lastActivity: "December 20, 2024"
  },
  {
    id: 5,
    title: "Team Restructuring Plan",
    lastActivity: "December 15, 2024"
  },
  {
    id: 6,
    title: "Office Relocation Strategy",
    lastActivity: "November 30, 2024"
  },
  {
    id: 7,
    title: "Vendor Selection Process",
    lastActivity: "November 15, 2024"
  }
];

export const ArchivedDecisions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDecisionClick = (id: number) => {
    navigate(`/decision/${id}`);
  };

  const handleUnarchive = (id: number) => {
    toast({
      title: "Decision Unarchived",
      description: "The decision has been moved back to active decisions.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Archived Decisions</h1>
            <p className="text-gray-600 mt-1">View and manage your archived strategic decisions</p>
          </div>
        </div>

        {/* Archived Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArchivedDecisions.map((decision) => (
            <DecisionCard
              key={decision.id}
              title={decision.title}
              lastActivity={decision.lastActivity}
              onClick={() => handleDecisionClick(decision.id)}
              onArchive={() => handleUnarchive(decision.id)}
            />
          ))}
        </div>

        {mockArchivedDecisions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No archived decisions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};