import mongoose from 'mongoose';
const { Schema, models, model } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    currentStage: { type: String, enum: ['ONGOING', 'COMPLETED', 'LOOKING_FOR_CONTRIBUTORS'], default: 'ONGOING' },
    category: { type: String, default: '' },
    stage: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    githubRepoLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    requirements: { type: [String], default: [] },
    organization: { type: String, default: '' },
    country: { type: String, default: '' },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

// Avoid model overwrite in dev/runtime
export default models.Project || model('Project', ProjectSchema);
