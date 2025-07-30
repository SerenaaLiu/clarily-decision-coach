import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/clarily-judgment-coach';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// User Schema
const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Project Schema
const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  name: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['active', 'completed', 'on-hold'], 
    default: 'active' 
  },
  objectives: [String],
  constraints: [String],
  teamMembers: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Decision Schema
const decisionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  lastActivity: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['ongoing', 'completed', 'archived'], 
    default: 'ongoing' 
  },
  meetingTranscript: String,
  analysisData: {
    summary: {
      total_blind_spots: Number,
      high_severity_count: Number,
      frameworks_recommended: Number,
      mental_models_recommended: Number
    },
    blindSpots: [{
      name: String,
      type: { type: String, enum: ['blind_spot'] },
      severity: { type: String, enum: ['low', 'medium', 'high'] },
      description: String,
      snippet: String,
      recommendedModels: [String]
    }],
    mentalModels: [{
      name: String,
      type: { type: String, enum: ['model'] },
      description: String,
      process: String
    }],
    framework: {
      name: String,
      description: String,
      why_recommended: String,
      how_to_use: [String],
      content: {
        pros: [String],
        cons: [String]
      }
    },
    guiding_questions_for_next_discussion: [String]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create indexes for better performance
userSchema.index({ clerkId: 1 });
projectSchema.index({ userId: 1 });
decisionSchema.index({ projectId: 1 });
decisionSchema.index({ status: 1 });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Decision = mongoose.models.Decision || mongoose.model('Decision', decisionSchema); 