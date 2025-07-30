import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Upload, LogOut, User, Plus, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    status: "active"
  },
  {
    id: 2,
    name: "Company X Acquisition",
    description: "Due diligence and strategic analysis for potential acquisition of Company X and integration planning.",
    createdAt: "November 15, 2024",
    lastActivity: "January 12, 2025",
    decisionCount: 2,
    teamMembers: ["Sarah Johnson", "Mike Chen", "Alex Thompson"],
    status: "active"
  },
  {
    id: 3,
    name: "Market Expansion Initiative",
    description: "Research and planning for expansion into new geographic markets and customer segments.",
    createdAt: "October 20, 2024",
    lastActivity: "January 10, 2025",
    decisionCount: 1,
    teamMembers: ["Lisa Rodriguez", "David Kim", "Emma Wilson"],
    status: "active"
  },
  {
    id: 4,
    name: "Team Restructuring",
    description: "Organizational changes and team structure optimization for improved efficiency and collaboration.",
    createdAt: "September 10, 2024",
    lastActivity: "December 15, 2024",
    decisionCount: 2,
    teamMembers: ["Sarah Johnson", "HR Team"],
    status: "completed"
  },
  {
    id: 5,
    name: "Technology Stack Migration",
    description: "Evaluation and migration planning for new technology stack to improve performance and scalability.",
    createdAt: "August 5, 2024",
    lastActivity: "November 30, 2024",
    decisionCount: 1,
    teamMembers: ["Mike Chen", "Tech Team"],
    status: "on-hold"
  }
];

export const Projects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCreateProject = () => {
    // For now, just show a toast. In a real app, this would open a modal or navigate to a create project page
    toast({
      title: "Create Project",
      description: "Project creation feature coming soon!",
    });
  };

  const handleUploadTranscript = () => {
    // Navigate to a project selection or creation flow
    toast({
      title: "Upload Transcript",
      description: "Please select or create a project first.",
    });
  };

  const getProjectStats = () => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalDecisions = projects.reduce((sum, p) => sum + p.decisionCount, 0);
    
    return { totalProjects, activeProjects, totalDecisions };
  };

  const stats = getProjectStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Clarily Dashboard</h1>
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
            <p className="text-gray-600 mt-1">Manage your projects and their strategic decisions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleUploadTranscript}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Transcript
            </Button>
            <Button 
              onClick={handleCreateProject}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalProjects}</div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="h-4 w-4 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeProjects}</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="h-4 w-4 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalDecisions}</div>
                <div className="text-sm text-gray-600">Total Decisions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first project to start organizing your strategic decisions.
            </p>
            <Button onClick={handleCreateProject} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 