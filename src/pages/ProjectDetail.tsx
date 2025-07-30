import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DecisionCard } from "@/components/DecisionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Upload, 
  User, 
  LogOut, 
  Calendar, 
  Users, 
  FolderOpen,
  Plus,
  Settings
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  lastActivity: string;
  decisionCount: number;
  teamMembers: string[];
  status: 'active' | 'completed' | 'on-hold';
  objectives: string[];
  constraints: string[];
}

interface Decision {
  id: number;
  title: string;
  lastActivity: string;
  status: string;
  projectId: number;
}

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Q4 Product Strategy",
    description: "Strategic planning and decision-making for Q4 product roadmap and market expansion initiatives.",
    createdAt: "December 1, 2024",
    lastActivity: "January 15, 2025",
    decisionCount: 3,
    teamMembers: ["Sarah Johnson", "Mike Chen", "Lisa Rodriguez", "David Kim"],
    status: "active",
    objectives: [
      "Define Q4 product roadmap priorities",
      "Identify market expansion opportunities",
      "Optimize resource allocation for new features"
    ],
    constraints: [
      "Budget limited to $2M for Q4",
      "Team capacity of 15 developers",
      "Must launch before holiday season"
    ]
  }
];

const mockDecisions: Decision[] = [
  {
    id: 1,
    title: "Q4 Product Strategy Direction",
    lastActivity: "January 15, 2025",
    status: "Ongoing",
    projectId: 1
  },
  {
    id: 2,
    title: "Feature Prioritization Framework",
    lastActivity: "January 10, 2025",
    status: "Completed",
    projectId: 1
  },
  {
    id: 3,
    title: "Market Entry Strategy",
    lastActivity: "January 8, 2025",
    status: "Ongoing",
    projectId: 1
  }
];

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  
  const project = mockProjects.find(p => p.id === Number(id));
  const projectDecisions = mockDecisions.filter(d => d.projectId === Number(id));
  const [decisions, setDecisions] = useState<Decision[]>(projectDecisions);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const handleDecisionClick = (decisionId: number) => {
    navigate(`/project/${project.id}/decision/${decisionId}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleArchiveDecision = (decisionId: number) => {
    setDecisions(prev => prev.filter(decision => decision.id !== decisionId));
    toast({
      title: "Decision Archived",
      description: "The decision has been moved to the archive.",
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
          transcript: fileContent,
          projectContext: {
            name: project.name,
            description: project.description,
            objectives: project.objectives,
            constraints: project.constraints
          }
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

      // Generate a temporary id for the new decision
      const newId = Date.now();
      navigate(`/decision/${newId}`, {
        state: {
          decisionData: result,
          generatedId: newId,
          transcript: fileContent,
          projectId: project.id
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Project Context */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                  </div>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{project.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {project.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{project.teamMembers.length} team members</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Context */}
          <div className="space-y-6">
            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-blue-600 font-medium">•</span>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Constraints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-red-600 font-medium">•</span>
                      <span className="text-gray-700">{constraint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Decisions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Project Decisions</h2>
              <p className="text-gray-600 mt-1">Strategic decisions made within this project context</p>
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
                onClick={() => document.getElementById('transcript-upload')?.click()}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? 'Analyzing...' : 'Upload Transcript'}
              </Button>
            </div>
          </div>

          {/* Decisions Grid */}
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

          {/* Empty State */}
          {decisions.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No decisions yet</h3>
              <p className="text-gray-600 mb-4">
                Upload a meeting transcript to start analyzing decisions for this project.
              </p>
              <Button 
                onClick={() => document.getElementById('transcript-upload')?.click()}
                className="flex items-center gap-2 mx-auto"
              >
                <Upload className="h-4 w-4" />
                Upload Transcript
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 