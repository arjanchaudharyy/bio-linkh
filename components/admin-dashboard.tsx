"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Eye, TrendingUp, Users, LogOut, Globe, MousePointer } from "lucide-react"

interface ClickData {
  id: number
  link_name: string
  link_url: string
  clicked_at: string
  user_agent: string
  ip_address: string
  referrer: string | null
}

interface VisitData {
  id: number
  visited_at: string
  user_agent: string
  ip_address: string
  referrer: string | null
  referrer_platform: string | null
}

interface AnalyticsData {
  totalClicks: number
  totalVisits: number
  uniqueVisitors: number
  topLinks: Array<{ name: string; clicks: number }>
  topPlatforms: Array<{ platform: string; visits: number }>
  recentClicks: ClickData[]
  recentVisits: VisitData[]
  clicksByDay: Array<{ date: string; clicks: number }>
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [timeFilter, setTimeFilter] = useState("7d")
  const [databaseNotSetup, setDatabaseNotSetup] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword("")
        loadAnalytics()
      } else {
        setError("Invalid password")
      }
    } catch (error) {
      setError("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const loadAnalytics = async () => {
    try {
      console.log("[Admin] Loading analytics...")
      const response = await fetch(`/api/admin/analytics?timeFilter=${timeFilter}`)

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false)
          return
        }

        const errorData = await response.json()
        console.error("[Admin] Analytics API error:", errorData)
        
        if (errorData.error === "SUPABASE_NOT_CONFIGURED" || errorData.error === "DATABASE_NOT_SETUP") {
          setDatabaseNotSetup(true)
          setAnalytics({
            totalClicks: 0,
            totalVisits: 0,
            uniqueVisitors: 0,
            topLinks: [],
            topPlatforms: [],
            recentClicks: [],
            recentVisits: [],
            clicksByDay: [],
          })
          return
        }
        throw new Error(errorData.message || "Failed to load analytics")
      }

      const data = await response.json()
      console.log("[Admin] Analytics loaded successfully")
      setAnalytics(data)
      setDatabaseNotSetup(false)
    } catch (error) {
      console.error("[Admin] Failed to load analytics:", error)
      setAnalytics({
        totalClicks: 0,
        totalVisits: 0,
        uniqueVisitors: 0,
        topLinks: [],
        topPlatforms: [],
        recentClicks: [],
        recentVisits: [],
        clicksByDay: [],
      })
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
    setIsAuthenticated(false)
    setAnalytics(null)
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/analytics?timeFilter=7d")
        if (response.ok) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadAnalytics()
    }
  }, [timeFilter, isAuthenticated])

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter password to access analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  const COLORS = ["#000000", "#404040", "#808080", "#a0a0a0", "#c0c0c0"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Bio link performance insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {databaseNotSetup && (
          <Card className="mb-8 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <CardHeader>
              <CardTitle className="text-yellow-900 dark:text-yellow-100">Setup Required</CardTitle>
              <CardDescription className="text-yellow-800 dark:text-yellow-200">
                Analytics tracking is not configured yet. Follow these steps:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-yellow-900 dark:text-yellow-100">
              <div>
                <p className="font-medium mb-2">1. Configure Supabase (if not already done):</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                  <li>Get your project URL and anon key from Settings → API</li>
                  <li>Add these to your Vercel environment variables:
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li><code className="bg-yellow-100 dark:bg-yellow-900 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                      <li><code className="bg-yellow-100 dark:bg-yellow-900 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                    </ul>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium mb-2">2. Run SQL scripts in your Supabase SQL Editor:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li><code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">scripts/01-create-analytics-tables.sql</code></li>
                  <li><code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">scripts/03-add-page-visits-tracking.sql</code></li>
                  <li><code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">scripts/04-add-performance-indexes.sql</code></li>
                </ol>
              </div>

              <div>
                <p className="font-medium">3. Redeploy your Vercel app or restart your dev server</p>
                <p className="text-xs mt-1 opacity-80">Analytics will start tracking once everything is configured.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Visits</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalVisits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalClicks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.uniqueVisitors}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Link</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.topLinks[0]?.name || "N/A"}</div>
              <p className="text-xs text-muted-foreground">{analytics.topLinks[0]?.clicks || 0} clicks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.topPlatforms[0]?.platform || "Direct"}</div>
              <p className="text-xs text-muted-foreground">{analytics.topPlatforms[0]?.visits || 0} visits</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="links">Link Performance</TabsTrigger>
            <TabsTrigger value="platforms">Traffic Sources</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Clicks Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Clicks Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.clicksByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="clicks" fill="#000000" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Links Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Link Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.topLinks.slice(0, 5)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="clicks"
                      >
                        {analytics.topLinks.slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="links">
            <Card>
              <CardHeader>
                <CardTitle>Link Performance</CardTitle>
                <CardDescription>Click statistics for each link</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topLinks.map((link, index) => (
                    <div key={link.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <div>
                          <p className="font-medium">{link.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{link.clicks}</p>
                        <p className="text-sm text-muted-foreground">clicks</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPlatforms.length > 0 ? (
                    analytics.topPlatforms.map((platform, index) => (
                      <div key={platform.platform} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <div>
                            <p className="font-medium">{platform.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{platform.visits}</p>
                          <p className="text-sm text-muted-foreground">visits</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No referrer data available yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Page Visits</CardTitle>
                  <CardDescription>Latest visitors to your bio link page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.recentVisits.slice(0, 10).map((visit) => (
                      <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Page Visit</p>
                          <p className="text-sm text-muted-foreground">{new Date(visit.visited_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>IP: {visit.ip_address || "Unknown"}</p>
                          {visit.referrer_platform && <p>From: {visit.referrer_platform}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Link Clicks</CardTitle>
                  <CardDescription>Latest link clicks and visitor information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.recentClicks.slice(0, 10).map((click) => (
                      <div key={click.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{click.link_name}</p>
                          <p className="text-sm text-muted-foreground">{new Date(click.clicked_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>IP: {click.ip_address || "Unknown"}</p>
                          {click.referrer && <p>From: {new URL(click.referrer).hostname}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
