import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Calendar, Users, ArrowRight } from "lucide-react";

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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
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
    <Card className="group hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FolderOpen className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {project.name}
                </h3>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>

          {/* Project Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>

          {/* Project Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{project.lastActivity}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{project.teamMembers.length} members</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{project.decisionCount}</div>
              <div className="text-xs">decisions</div>
            </div>
          </div>

          {/* Team Members Preview */}
          {project.teamMembers.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Team:</span>
              <div className="flex -space-x-1">
                {project.teamMembers.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium"
                    title={member}
                  >
                    {member.charAt(0).toUpperCase()}
                  </div>
                ))}
                {project.teamMembers.length > 3 && (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600 font-medium">
                    +{project.teamMembers.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 