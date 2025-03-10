"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<
    Array<{
      id: string
      name: string
      phone: string
      apiId: string
      apiHash: string
      connected: boolean
    }>
  >([
    {
      id: "1",
      name: "Main Account",
      phone: "+79123456789",
      apiId: "12345678",
      apiHash: "abcdef1234567890abcdef1234567890",
      connected: true,
    },
    {
      id: "2",
      name: "Business Account",
      phone: "+79876543210",
      apiId: "87654321",
      apiHash: "fedcba0987654321fedcba0987654321",
      connected: false,
    },
  ])

  const [newAccount, setNewAccount] = useState({
    name: "",
    phone: "",
    apiId: "",
    apiHash: "",
  })

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.phone || !newAccount.apiId || !newAccount.apiHash) {
      return
    }

    setAccounts([
      ...accounts,
      {
        id: Date.now().toString(),
        name: newAccount.name,
        phone: newAccount.phone,
        apiId: newAccount.apiId,
        apiHash: newAccount.apiHash,
        connected: false,
      },
    ])

    setNewAccount({
      name: "",
      phone: "",
      apiId: "",
      apiHash: "",
    })
  }

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))
  }

  const handleConnect = (id: string) => {
    setAccounts(
      accounts.map((account) => (account.id === id ? { ...account, connected: !account.connected } : account)),
    )
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Manage Telegram Accounts</h1>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          You need to obtain API ID and API Hash from{" "}
          <a href="https://my.telegram.org/apps" className="underline" target="_blank" rel="noopener noreferrer">
            my.telegram.org/apps
          </a>{" "}
          for each account you want to connect.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{account.name}</CardTitle>
                <Badge variant={account.connected ? "default" : "outline"}>
                  {account.connected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <CardDescription>{account.phone}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 font-medium">API ID:</div>
                  <div className="col-span-3">{account.apiId}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 font-medium">API Hash:</div>
                  <div className="col-span-3">{account.apiHash.substring(0, 8)}...</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant={account.connected ? "destructive" : "default"} onClick={() => handleConnect(account.id)}>
                {account.connected ? "Disconnect" : "Connect"}
              </Button>
              <Button variant="outline" onClick={() => handleRemoveAccount(account.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Add New Account</CardTitle>
            <CardDescription>Enter the details for a new Telegram account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Account Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Business Account"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+79123456789"
                  value={newAccount.phone}
                  onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiId">API ID</Label>
                <Input
                  id="apiId"
                  placeholder="12345678"
                  value={newAccount.apiId}
                  onChange={(e) => setNewAccount({ ...newAccount, apiId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiHash">API Hash</Label>
                <Input
                  id="apiHash"
                  placeholder="abcdef1234567890abcdef1234567890"
                  value={newAccount.apiHash}
                  onChange={(e) => setNewAccount({ ...newAccount, apiHash: e.target.value })}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddAccount}>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

