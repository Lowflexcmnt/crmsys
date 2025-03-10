"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, Phone, Video, MoreVertical, Filter } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MessagesPage() {
  const [activeAccount, setActiveAccount] = useState("all")
  const [activeChat, setActiveChat] = useState<string | null>("1")

  // Mock data
  const accounts = [
    { id: "1", name: "Main Account", phone: "+79123456789" },
    { id: "2", name: "Business Account", phone: "+79876543210" },
  ]

  const chats = [
    {
      id: "1",
      name: "Alex Smith",
      lastMessage: "When will the order be ready?",
      time: "10:42 AM",
      unread: 2,
      accountId: "1",
    },
    {
      id: "2",
      name: "Maria Johnson",
      lastMessage: "Thanks for the information!",
      time: "Yesterday",
      unread: 0,
      accountId: "1",
    },
    {
      id: "3",
      name: "Business Partner",
      lastMessage: "Let's discuss the contract details",
      time: "Yesterday",
      unread: 5,
      accountId: "2",
    },
    {
      id: "4",
      name: "Support Team",
      lastMessage: "The issue has been resolved",
      time: "Monday",
      unread: 0,
      accountId: "2",
    },
  ]

  const messages = [
    {
      id: "1",
      chatId: "1",
      text: "Hello, I placed an order #12345 yesterday",
      time: "10:30 AM",
      isIncoming: true,
    },
    {
      id: "2",
      chatId: "1",
      text: "Hi! Let me check that for you",
      time: "10:32 AM",
      isIncoming: false,
    },
    {
      id: "3",
      chatId: "1",
      text: "When will the order be ready?",
      time: "10:42 AM",
      isIncoming: true,
    },
  ]

  const filteredChats = activeAccount === "all" ? chats : chats.filter((chat) => chat.accountId === activeAccount)

  const currentChatMessages = messages.filter((message) => message.chatId === activeChat)
  const currentChat = chats.find((chat) => chat.id === activeChat)
  const currentChatAccount = accounts.find((account) => account.id === currentChat?.accountId)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Messages</h2>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={activeAccount} onValueChange={setActiveAccount}>
              <SelectTrigger>
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

          <div className="relative mt-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages" className="pl-8" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 cursor-pointer hover:bg-muted/50 ${activeChat === chat.id ? "bg-muted" : ""}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">{chat.name}</div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-sm text-muted-foreground truncate">{chat.lastMessage}</div>
                      {chat.unread > 0 && (
                        <Badge variant="default" className="ml-2 rounded-full px-1.5 py-0.5 text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        {accounts.find((a) => a.id === chat.accountId)?.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                <AvatarFallback>{currentChat?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{currentChat?.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    {currentChatAccount?.name}
                  </Badge>
                  <span>•</span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View contact</DropdownMenuItem>
                  <DropdownMenuItem>Search</DropdownMenuItem>
                  <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                  <DropdownMenuItem>Block</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentChatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isIncoming ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.isIncoming ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div>{message.text}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.isIncoming ? "text-muted-foreground" : "text-primary-foreground/80"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form className="flex items-center gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a chat to start messaging
        </div>
      )}
    </div>
  )
}

