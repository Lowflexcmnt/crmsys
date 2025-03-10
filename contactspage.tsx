"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Phone, MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactsPage() {
  const [activeAccount, setActiveAccount] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const accounts = [
    { id: "1", name: "Main Account", phone: "+79123456789" },
    { id: "2", name: "Business Account", phone: "+79876543210" },
  ]

  const contacts = [
    {
      id: "1",
      name: "Alex Smith",
      phone: "+1234567890",
      accountIds: ["1"],
    },
    {
      id: "2",
      name: "Maria Johnson",
      phone: "+0987654321",
      accountIds: ["1", "2"],
    },
    {
      id: "3",
      name: "Business Partner",
      phone: "+1122334455",
      accountIds: ["2"],
    },
    {
      id: "4",
      name: "Support Team",
      phone: "+5566778899",
      accountIds: ["2"],
    },
    {
      id: "5",
      name: "John Doe",
      phone: "+1231231234",
      accountIds: ["1"],
    },
    {
      id: "6",
      name: "Jane Smith",
      phone: "+9879879876",
      accountIds: ["1", "2"],
    },
  ]

  const filteredContacts = contacts
    .filter((contact) => (activeAccount === "all" ? true : contact.accountIds.includes(activeAccount)))
    .filter((contact) =>
      searchQuery
        ? contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery)
        : true,
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  // Group contacts by first letter
  const groupedContacts: Record<string, typeof contacts> = {}

  filteredContacts.forEach((contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase()
    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = []
    }
    groupedContacts[firstLetter].push(contact)
  })

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={activeAccount} onValueChange={setActiveAccount}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All accounts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All accounts</SelectItem>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="frequent">Frequent</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ScrollArea className="h-[calc(100vh-280px)]">
            {Object.keys(groupedContacts)
              .sort()
              .map((letter) => (
                <div key={letter} className="mb-6">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-2 sticky top-0 bg-background py-1">
                    {letter}
                  </h2>
                  <div className="grid gap-2">
                    {groupedContacts[letter].map((contact) => (
                      <Card key={contact.id} className="overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-muted-foreground">{contact.phone}</div>
                                <div className="flex gap-1 mt-1">
                                  {contact.accountIds.map((accountId) => {
                                    const account = accounts.find((a) => a.id === accountId)
                                    return (
                                      <Badge key={accountId} variant="outline" className="text-xs px-1.5 py-0">
                                        {account?.name}
                                      </Badge>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit contact</DropdownMenuItem>
                                  <DropdownMenuItem>Share contact</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete contact</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

            {Object.keys(groupedContacts).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No contacts found</div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="frequent">
          <div className="text-center py-12 text-muted-foreground">Frequent contacts will appear here</div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="text-center py-12 text-muted-foreground">Recent contacts will appear here</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

