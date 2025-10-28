'use client'

import { useState } from 'react'
import { Upload, Video, FileText, Calendar, Clock, CheckCircle, Play, Download, Sparkles } from 'lucide-react'

interface VideoIdea {
  id: string
  title: string
  description: string
  keywords: string[]
  status: 'draft' | 'scheduled' | 'published'
  scheduledDate?: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'schedule' | 'analytics'>('generate')
  const [videoIdeas, setVideoIdeas] = useState<VideoIdea[]>([
    {
      id: '1',
      title: '5 Quick Coding Tips',
      description: 'Learn essential coding shortcuts that will boost your productivity',
      keywords: ['coding', 'programming', 'tips', 'productivity'],
      status: 'draft'
    },
    {
      id: '2',
      title: 'How to Debug Like a Pro',
      description: 'Master debugging techniques used by professional developers',
      keywords: ['debugging', 'development', 'tutorial'],
      status: 'scheduled',
      scheduledDate: '2025-10-30'
    }
  ])
  const [topic, setTopic] = useState('')
  const [generating, setGenerating] = useState(false)

  const generateIdeas = () => {
    if (!topic.trim()) return

    setGenerating(true)
    setTimeout(() => {
      const newIdea: VideoIdea = {
        id: Date.now().toString(),
        title: `${topic} - Ultimate Guide`,
        description: `A comprehensive guide about ${topic} for beginners and experts`,
        keywords: topic.split(' ').map(word => word.toLowerCase()),
        status: 'draft'
      }
      setVideoIdeas([newIdea, ...videoIdeas])
      setTopic('')
      setGenerating(false)
    }, 1500)
  }

  const updateStatus = (id: string, status: 'draft' | 'scheduled' | 'published') => {
    setVideoIdeas(videoIdeas.map(idea =>
      idea.id === id ? { ...idea, status } : idea
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-12 h-12 text-red-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              YouTube Shorts Automation
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Streamline your content creation workflow
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'generate'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Generate Ideas
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'schedule'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            Analytics
          </button>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'generate' && (
            <div className="space-y-6">
              {/* Idea Generator */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  AI Content Idea Generator
                </h2>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic or keyword..."
                    className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && generateIdeas()}
                  />
                  <button
                    onClick={generateIdeas}
                    disabled={generating || !topic.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {generating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>

              {/* Video Ideas List */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Content Ideas</h2>
                <div className="space-y-4">
                  {videoIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-purple-400 transition-all hover:shadow-md"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{idea.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          idea.status === 'draft' ? 'bg-gray-200 text-gray-700' :
                          idea.status === 'scheduled' ? 'bg-blue-200 text-blue-700' :
                          'bg-green-200 text-green-700'
                        }`}>
                          {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{idea.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {idea.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                      {idea.scheduledDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <Clock className="w-4 h-4" />
                          Scheduled for {idea.scheduledDate}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {idea.status === 'draft' && (
                          <button
                            onClick={() => updateStatus(idea.id, 'scheduled')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                          >
                            Schedule
                          </button>
                        )}
                        {idea.status === 'scheduled' && (
                          <button
                            onClick={() => updateStatus(idea.id, 'published')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                          >
                            Mark Published
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                Content Schedule
              </h2>
              <div className="space-y-4">
                {videoIdeas.filter(idea => idea.status === 'scheduled').length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                    No videos scheduled yet. Generate ideas and schedule them!
                  </p>
                ) : (
                  videoIdeas
                    .filter(idea => idea.status === 'scheduled')
                    .map(idea => (
                      <div key={idea.id} className="border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{idea.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{idea.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Scheduled Date</div>
                            <div className="text-lg font-bold text-blue-600">{idea.scheduledDate}</div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 dark:text-gray-400">Total Videos</h3>
                    <Video className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-800 dark:text-white">{videoIdeas.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 dark:text-gray-400">Scheduled</h3>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-800 dark:text-white">
                    {videoIdeas.filter(v => v.status === 'scheduled').length}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600 dark:text-gray-400">Published</h3>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-800 dark:text-white">
                    {videoIdeas.filter(v => v.status === 'published').length}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-400 transition-all">
                    <Upload className="w-6 h-6 text-purple-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 dark:text-white">Bulk Upload</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Upload multiple videos at once</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-400 transition-all">
                    <Download className="w-6 h-6 text-purple-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 dark:text-white">Export Data</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Download your content schedule</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
