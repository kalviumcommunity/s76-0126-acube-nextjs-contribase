import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Project from '../../../models/Project';
import { fetchGitHubRepos } from '../../../lib/github';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';

    await connect();

    // Local projects search (title, description, tags)
    const regex = q ? { $regex: q, $options: 'i' } : null;
    const localQuery: any = {};
    if (regex) {
      localQuery.$or = [
        { title: regex },
        { description: regex },
        { techStack: regex },
        { organization: regex },
      ];
    }

    const localProjects = q ? await Project.find(localQuery).limit(50).lean() : await Project.find({}).limit(50).lean();

    // GitHub search
    const githubProjects = q ? await fetchGitHubRepos(q) : [];

    return NextResponse.json({ localProjects, githubProjects });
  } catch (err) {
    console.error('GET /api/search error', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
