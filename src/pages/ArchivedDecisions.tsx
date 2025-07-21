import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DecisionCard } from "@/components/DecisionCard";
import { ArrowLeft, Archive, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

const mockArchivedDecisions = [
  {
    id: 4,
    title: "Q3 Budget Allocation",
    lastActivity: "December 20, 2024",
    status: "Completed"
  },
  {
    id: 5,
    title: "Team Restructuring Plan",
    lastActivity: "December 15, 2024",
    status: "Completed"
  },
  {
    id: 6,
    title: "Office Relocation Decision",
    lastActivity: "November 30, 2024",
    status: "Completed"
  },
  {
    id: 7,
    title: "Vendor Selection Process",
    lastActivity: "November 15, 2024",
    status: "Completed"
  },
  {
    id: 8,
    title: "Q2 Marketing Strategy",
    lastActivity: "October 25, 2024",
    status: "Completed"
  },
  {
    id: 9,
    title: "Product Launch Timeline",
    lastActivity: "October 10, 2024",
    status: "Completed"
  }
];

export const ArchivedDecisions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [archivedDecisions, setArchivedDecisions] = useState(mockArchivedDecisions);

  const handleDecisionClick = (id: number) => {
    navigate(`/decision/${id}`);
  };

  const handleUnarchiveDecision = (id: number) => {
    setArchivedDecisions(prev => prev.filter(decision => decision.id !== id));
    toast({
      title: "Decision Unarchived",
      description: "The decision has been moved back to your active decisions.",
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Archived Decisions</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Archive className="h-8 w-8 text-gray-600" />
            <h2 className="text-3xl font-bold text-gray-900">Archived Decisions</h2>
          </div>
          <p className="text-gray-600">
            View and access all your completed and archived decisions
          </p>
        </div>

        {/* Archived Decisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedDecisions.map((decision) => (
            <DecisionCard
              key={decision.id}
              title={decision.title}
              lastActivity={decision.lastActivity}
              status={decision.status}
              isCompleted={true}
              onClick={() => handleDecisionClick(decision.id)}
              onUnarchive={() => handleUnarchiveDecision(decision.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {archivedDecisions.length === 0 && (
          <div className="text-center py-12">
            <Archive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No archived decisions yet</h3>
            <p className="text-gray-600 mb-4">
              Decisions will appear here once they are completed and archived.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 