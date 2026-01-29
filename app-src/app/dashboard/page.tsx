'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeNav, setActiveNav] = useState('dashboard')

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/signin')
    return null
  }

  const userName = session?.user?.name || 'User'
  const userEmail = session?.user?.email || ''
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-gray-900 text-white">
              C
            </div>
            <span className="text-xl font-bold text-gray-900">Contribase</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'projects', label: 'Projects', icon: '📁' },
            { id: 'issues', label: 'Issues', icon: '🐛' },
            { id: 'resources', label: 'Resources', icon: '📚' },
            { id: 'impact', label: 'Impact', icon: '⭐' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeNav === item.id
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500 truncate">Contributor</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {userName}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">🔍</button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              🔔
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">⚙️</button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500 mt-2">+2 from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Open Issues</p>
              <p className="text-3xl font-bold text-gray-900">47</p>
              <p className="text-xs text-red-600 mt-2">-5 from last week</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Contributions</p>
              <p className="text-3xl font-bold text-gray-900">238</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Impact Score</p>
              <p className="text-3xl font-bold text-gray-900">1,847</p>
              <p className="text-xs text-gray-500 mt-2">Top 5% contributor</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Achievements</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { emoji: '⭐', label: 'Impact Maker' },
                { emoji: '♻️', label: 'Reuse Champion' },
                { emoji: '👨‍💻', label: 'First PR' },
                { emoji: '🚀', label: 'Early Adopter' },
              ].map((badge, i) => (
                <div key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <span>{badge.emoji}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects & Recent Activity */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Active Projects</h2>
                <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all →
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: 'disaster-response-app',
                    desc: 'Mobile app for coordinating disaster response efforts and volunteer management',
                    status: 'Deployment',
                    statusColor: 'bg-green-100 text-green-700',
                    tags: ['React Native', 'Firebase', 'Maps API'],
                    stats: { stars: 234, forks: 45, issues: 12 },
                  },
                  {
                    name: 'food-bank-inventory',
                    desc: 'Inventory management system for food banks with donation tracking',
                    status: 'Testing',
                    statusColor: 'bg-orange-100 text-orange-700',
                    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
                    stats: { stars: 156, forks: 32, issues: 8 },
                  },
                ].map((project, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, ti) => (
                        <span key={ti} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>⭐ {project.stats.stars}</span>
                      <span>🔀 {project.stats.forks}</span>
                      <span>🐛 {project.stats.issues}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { user: 'Maria Garcia', action: 'merged PR #89', project: 'disaster-response-app', time: '15 minutes ago' },
                  { user: 'John Smith', action: 'opened issue #157', project: 'food-bank-inventory', time: '1 hour ago' },
                  { user: 'Emily Johnson', action: 'joined', project: 'education-platform', time: '2 hours ago' },
                  { user: 'David Lee', action: 'starred', project: 'disaster-response-app', time: '3 hours ago' },
                  { user: 'Lisa Wang', action: 'opened PR #390', project: 'disaster-response-app', time: '4 hours ago' },
                ].map((activity, i) => (
                  <div key={i} className="text-sm">
                    <p className="text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                      <span className="text-blue-600 font-medium">{activity.project}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contribution Opportunities */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Contribution Opportunities</h2>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
                + Find issues
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  issue: 'disaster-response-app #42',
                  title: 'Add multilingual support for disaster alerts',
                  tags: ['enhancement', 'good first issue'],
                  time: '2 hours ago',
                  comments: 5,
                },
              ].map((opp, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{opp.issue}</p>
                      <p className="text-sm text-gray-600 mt-1">{opp.title}</p>
                      <div className="flex gap-2 mt-2">
                        {opp.tags.map((tag, ti) => (
                          <span key={ti} className={`px-2 py-1 text-xs rounded-full ${tag === 'good first issue' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{opp.time}</span>
                  </div>
                  <div className="mt-3 flex gap-2 text-xs text-gray-500">
                    <span>💬 {opp.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
