import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, MessageSquare, Users, Settings } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Telegram CRM Manager</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Manage all your Telegram accounts in one place. Connect, view, and respond to messages from multiple
              accounts without switching between them.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Accounts</CardTitle>
                <CardDescription>Connect and manage your Telegram accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/accounts">
                  <Button className="w-full">
                    Manage Accounts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Messages</CardTitle>
                <CardDescription>View and respond to all your messages</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/messages">
                  <Button className="w-full">
                    Open Messages
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Contacts</CardTitle>
                <CardDescription>Manage your contacts across accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contacts">
                  <Button className="w-full">
                    View Contacts
                    <Users className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

