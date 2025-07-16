
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DecisionCard } from "@/components/DecisionCard";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockInProgressDecisions = [
  {
    id: 1,
    title: "Q4 Product Strategy Direction",
    lastActivity: "January 15, 2025",
    status: "Ongoing"
  },
  {
    id: 2,
    title: "Company X Acquisition Target",
    lastActivity: "January 12, 2025",
    status: "Review Phase"
  },
  {
    id: 3,
    title: "Market Expansion Initiative",
    lastActivity: "January 10, 2025",
    status: "Ongoing"
  }
];

const mockCompletedDecisions = [
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
  }
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleDecisionClick = (id: number) => {
    navigate(`/decision/${id}`);
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

      console.log('Analysis result:', result);
      
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

        {/* In Progress Decisions */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInProgressDecisions.map((decision) => (
              <DecisionCard
                key={decision.id}
                title={decision.title}
                lastActivity={decision.lastActivity}
                status={decision.status}
                onClick={() => handleDecisionClick(decision.id)}
              />
            ))}
          </div>
        </div>

        {/* Completed Decisions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Decisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCompletedDecisions.map((decision) => (
              <DecisionCard
                key={decision.id}
                title={decision.title}
                lastActivity={decision.lastActivity}
                status={decision.status}
                isCompleted={true}
                onClick={() => handleDecisionClick(decision.id)}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Button variant="outline">
            View All Past Decisions
          </Button>
        </div>
      </div>
    </div>
  );
};
