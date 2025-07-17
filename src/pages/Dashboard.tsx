
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DecisionCard } from "@/components/DecisionCard";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockDecisions = [
  {
    id: 1,
    title: "Q4 Product Strategy Direction",
    lastActivity: "January 15, 2025"
  },
  {
    id: 2,
    title: "Company X Acquisition Target",
    lastActivity: "January 12, 2025"
  },
  {
    id: 3,
    title: "Market Expansion Initiative",
    lastActivity: "January 10, 2025"
  }
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [decisions, setDecisions] = useState(mockDecisions);

  const handleDecisionClick = (id: number) => {
    navigate(`/decision/${id}`);
  };

  const handleArchiveDecision = (id: number) => {
    setDecisions(decisions.filter(decision => decision.id !== id));
    toast({
      title: "Decision Archived",
      description: "The decision has been moved to archived decisions.",
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileContent = await file.text();

      const response = await fetch('https://clarily-backend-temp.onrender.com/analyze_meeting_transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: fileContent
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze transcript');
      }

      const result = await response.json();

      toast({
        title: "Transcript Analyzed",
        description: "Your meeting transcript has been successfully analyzed.",
      });

      // Generate a temporary id for the new decision (e.g., timestamp)
      const newId = Date.now();
      // Navigate to DecisionDetail and pass backend data as state
      navigate(`/decision/${newId}`, {
        state: {
          decisionData: result,
          generatedId: newId,
          transcript: fileContent // Include the original transcript
        }
      });

    } catch (error) {
      console.error('Error uploading transcript:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error analyzing your transcript. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Decisions</h1>
            <p className="text-gray-600 mt-1">Track and analyze your strategic decisions</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="transcript-upload"
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              className="flex items-center gap-2"
              onClick={() => document.getElementById('transcript-upload')?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Analyzing...' : 'Upload Transcript'}
            </Button>
          </div>
        </div>

        {/* All Decisions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decisions.map((decision) => (
              <DecisionCard
                key={decision.id}
                title={decision.title}
                lastActivity={decision.lastActivity}
                onClick={() => handleDecisionClick(decision.id)}
                onArchive={() => handleArchiveDecision(decision.id)}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/archived')}>
            View All Past Decisions
          </Button>
        </div>
      </div>
    </div>
  );
};
