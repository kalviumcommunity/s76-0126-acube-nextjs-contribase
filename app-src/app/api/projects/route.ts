import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Project from '../../../models/Project';

export async function GET() {
  try {
    await connect();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error('GET /api/projects error', err);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();

    // Basic validation
    if (!body?.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const payload = {
      title: body.title,
      description: body.description ?? '',
      currentStage: body.currentStage ?? 'ONGOING',
      category: body.category ?? '',
      stage: body.stage ?? '',
      techStack: Array.isArray(body.techStack) ? body.techStack : (body.techStack ? String(body.techStack).split(',').map((s: string) => s.trim()) : []),
      githubRepoLink: body.githubRepoLink ?? '',
      liveLink: body.liveLink ?? '',
      requirements: Array.isArray(body.requirements) ? body.requirements : (body.requirements ? String(body.requirements).split(',').map((s: string) => s.trim()) : []),
      organization: body.organization ?? '',
    };

    const doc = await Project.create(payload as any);
    return NextResponse.json({ project: doc }, { status: 201 });
  } catch (err) {
    console.error('POST /api/projects error', err);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
