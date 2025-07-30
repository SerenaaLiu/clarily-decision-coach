import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Project, Decision, connectToDatabase } from '@/lib/mongodb';

// Simple database operations
const dbOperations = {
  async getProjects(userId: string) {
    await connectToDatabase();
    return Project.find({ userId }).sort({ createdAt: -1 }).lean();
  },

  async createProject(data: any) {
    await connectToDatabase();
    const project = new Project(data);
    return project.save();
  },

  async getDecisions(projectId: string) {
    await connectToDatabase();
    return Decision.find({ projectId }).sort({ createdAt: -1 }).lean();
  },

  async createDecision(data: any) {
    await connectToDatabase();
    const decision = new Decision(data);
    return decision.save();
  },

  async updateDecision(id: string, data: any) {
    await connectToDatabase();
    return Decision.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true }).lean();
  },

  async archiveDecision(id: string) {
    await connectToDatabase();
    return Decision.findByIdAndUpdate(id, { status: 'archived', updatedAt: new Date() }, { new: true }).lean();
  },

  async unarchiveDecision(id: string) {
    await connectToDatabase();
    return Decision.findByIdAndUpdate(id, { status: 'ongoing', updatedAt: new Date() }, { new: true }).lean();
  },

  async getArchivedDecisions(userId: string) {
    await connectToDatabase();
    const projects = await Project.find({ userId }).lean();
    const projectIds = projects.map((p: any) => p._id);
    return Decision.find({ 
      projectId: { $in: projectIds }, 
      status: 'archived' 
    }).populate('projectId').sort({ updatedAt: -1 }).lean();
  }
};

// Projects hooks
export const useProjects = () => {
  const { userId } = useAuth();
  
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: () => dbOperations.getProjects(userId!),
    enabled: !!userId
  });
};

export const useCreateProject = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (projectData: { name: string; description: string; objectives?: string[]; constraints?: string[]; teamMembers?: string[] }) => {
      return dbOperations.createProject({
        ...projectData,
        userId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
};

// Decisions hooks
export const useDecisions = (projectId: string) => {
  return useQuery({
    queryKey: ['decisions', projectId],
    queryFn: () => dbOperations.getDecisions(projectId),
    enabled: !!projectId
  });
};

export const useCreateDecision = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (decisionData: { 
      projectId: string; 
      title: string; 
      meetingTranscript?: string;
      analysisData?: any;
    }) => {
      return dbOperations.createDecision(decisionData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['decisions', data.projectId] });
    }
  });
};

export const useArchiveDecision = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (decisionId: string) => {
      return dbOperations.archiveDecision(decisionId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['decisions', data.projectId] });
    }
  });
};

export const useUnarchiveDecision = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (decisionId: string) => {
      return dbOperations.unarchiveDecision(decisionId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['decisions', data.projectId] });
    }
  });
};

// Archived decisions hooks
export const useArchivedDecisions = () => {
  const { userId } = useAuth();
  
  return useQuery({
    queryKey: ['archived-decisions', userId],
    queryFn: () => dbOperations.getArchivedDecisions(userId!),
    enabled: !!userId
  });
}; 