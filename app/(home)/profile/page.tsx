'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User, Settings, Clock, Shield } from 'lucide-react'

export default function ProfilePage() {
  const { isLoaded, user } = useUser()
  const { openUserProfile } = useClerk()

  if (!isLoaded || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground mb-4">{user.emailAddresses[0].emailAddress}</p>
            <Button variant="outline" size="sm" onClick={() => openUserProfile()}>
              Edit Profile
            </Button>
          </div>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Full Name</h3>
                    <p className="text-muted-foreground">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Account Type</h3>
                    <p className="text-muted-foreground">Premium</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Member Since</h3>
                    <p className="text-muted-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Preferences content would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Chat History
                </CardTitle>
                <CardDescription>View your past conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>History content would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Privacy content would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
