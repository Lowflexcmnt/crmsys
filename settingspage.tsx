"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      sound: true,
      desktop: true,
      inApp: true,
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
    },
    privacy: {
      readReceipts: true,
      lastSeen: true,
      typing: true,
    },
    sync: {
      autoSync: true,
      syncInterval: "15min",
    },
  })

  const handleToggleChange = (category: string, setting: string) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [setting]: !settings[category as keyof typeof settings][setting as any],
      },
    })
  }

  const handleSelectChange = (category: string, setting: string, value: string) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [setting]: value,
      },
    })
  }

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Synchronization</CardTitle>
              <CardDescription>Configure how the application syncs with Telegram servers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSync">Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync messages in the background</p>
                </div>
                <Switch
                  id="autoSync"
                  checked={settings.sync.autoSync}
                  onCheckedChange={() => handleToggleChange("sync", "autoSync")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="syncInterval">Sync Interval</Label>
                <Select
                  value={settings.sync.syncInterval}
                  onValueChange={(value) => handleSelectChange("sync", "syncInterval", value)}
                >
                  <SelectTrigger id="syncInterval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="30min">Every 30 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataFolder">Data Storage Location</Label>
                <div className="flex gap-2">
                  <Input id="dataFolder" value="C:\Users\AppData\Roaming\TelegramCRM" readOnly />
                  <Button variant="outline">Browse</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Startup</CardTitle>
              <CardDescription>Configure application startup behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="startWithSystem">Start with system</Label>
                  <p className="text-sm text-muted-foreground">Launch the application when your computer starts</p>
                </div>
                <Switch id="startWithSystem" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="startMinimized">Start minimized</Label>
                  <p className="text-sm text-muted-foreground">Start the application minimized to the system tray</p>
                </div>
                <Switch id="startMinimized" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound">Sound</Label>
                  <p className="text-sm text-muted-foreground">Play a sound when you receive a new message</p>
                </div>
                <Switch
                  id="sound"
                  checked={settings.notifications.sound}
                  onCheckedChange={() => handleToggleChange("notifications", "sound")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="desktop">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show desktop notifications for new messages</p>
                </div>
                <Switch
                  id="desktop"
                  checked={settings.notifications.desktop}
                  onCheckedChange={() => handleToggleChange("notifications", "desktop")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="inApp">In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                </div>
                <Switch
                  id="inApp"
                  checked={settings.notifications.inApp}
                  onCheckedChange={() => handleToggleChange("notifications", "inApp")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) => handleSelectChange("appearance", "theme", value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  value={settings.appearance.fontSize}
                  onValueChange={(value) => handleSelectChange("appearance", "fontSize", value)}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configure your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="readReceipts">Read Receipts</Label>
                  <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                </div>
                <Switch
                  id="readReceipts"
                  checked={settings.privacy.readReceipts}
                  onCheckedChange={() => handleToggleChange("privacy", "readReceipts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lastSeen">Last Seen</Label>
                  <p className="text-sm text-muted-foreground">Show when you were last online</p>
                </div>
                <Switch
                  id="lastSeen"
                  checked={settings.privacy.lastSeen}
                  onCheckedChange={() => handleToggleChange("privacy", "lastSeen")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="typing">Typing Indicator</Label>
                  <p className="text-sm text-muted-foreground">Show when you are typing a message</p>
                </div>
                <Switch
                  id="typing"
                  checked={settings.privacy.typing}
                  onCheckedChange={() => handleToggleChange("privacy", "typing")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Telegram CRM</CardTitle>
              <CardDescription>Application information and credits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Developer</h3>
                <p className="text-sm text-muted-foreground">Your Name</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Technologies</h3>
                <p className="text-sm text-muted-foreground">Electron, Next.js, Telegram API</p>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Check for Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

