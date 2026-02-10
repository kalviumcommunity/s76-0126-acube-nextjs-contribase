import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Project from '../../../models/Project';
import { fetchGitHubRepos } from '../../../lib/github';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const per_page = parseInt(url.searchParams.get('per_page') || '100', 10) || 100;

    // Local fuzzy/semantic-like search: look for close matches in title/description/techStack
    let similarProject = null;
    try {
      await connect();
      const regex = q ? { $regex: q, $options: 'i' } : null;
      if (regex) {
        // Try to find a close project by title/description/techStack
        similarProject = await Project.findOne({
          $or: [
            { title: regex },
            { description: regex },
            { techStack: regex },
            { organization: regex },
          ],
        }).lean();
      }
    } catch (dbErr) {
      console.warn('Database connection failed, proceeding with GitHub search only', dbErr);
      // Continue with GitHub search even if database is unavailable
    }

    // GitHub search - only when user searches or on projects page default fallback
    const githubQuery = q || 'stars:>100';
    const ghRes = await fetchGitHubRepos(githubQuery, page, per_page);

    // propagate rate-limit info if present
    if ((ghRes as any).error === 'rate_limited') {
      return NextResponse.json({ error: 'rate_limited', reset: (ghRes as any).reset }, { status: 429 });
    }

    return NextResponse.json({ similarProject: similarProject ?? null, githubProjects: (ghRes as any).items ?? [], total_count: (ghRes as any).total_count ?? 0 });
  } catch (err) {
    console.error('GET /api/search error', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
