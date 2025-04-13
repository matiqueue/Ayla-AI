'use client'

import { useState } from 'react'
import { useUser, useClerk, useSessionList } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { User, Shield, Key, Smartphone, LogOut, AlertTriangle } from 'lucide-react'

export default function ProfilePage() {
  const { isLoaded, user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const { sessions, isLoaded: sessionsLoaded } = useSessionList()
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [mfaEnabled, setMfaEnabled] = useState(user?.twoFactorEnabled || false)
  const [totpSecret, setTotpSecret] = useState('')

  if (!isLoaded || !user || !sessionsLoaded) {
    return <div>Loading...</div>
  }

  // Funkcja do zmiany hasła
  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      setPasswordError('Hasło musi mieć co najmniej 8 znaków')
      return
    }
    try {
      await user.updatePassword({
        newPassword,
        signOutOfOtherSessions: true,
      })
      setPasswordError('')
      setNewPassword('')
      alert('Hasło zmienione pomyślnie')
    } catch (err) {
      const errorMessage =
        typeof err === 'object' &&
        err !== null &&
        'errors' in err &&
        Array.isArray((err as { errors: { message: string }[] }).errors)
          ? (err as { errors: { message: string }[] }).errors[0]?.message
          : err instanceof Error
            ? err.message
            : 'Nie udało się zmienić hasła'
      setPasswordError(errorMessage)
    }
  }

  // Funkcja do wylogowania z sesji
  const handleSignOutSession = async (sessionId: string) => {
    if (confirm('Czy na pewno chcesz wylogować tę sesję?')) {
      try {
        await user
          .getSessions()
          .then((sessions) => sessions.find((s) => s.id === sessionId)?.revoke())
        alert('Sesja wylogowana')
      } catch (err) {
        alert(`Nie udało się wylogować sesji: ${err}`)
      }
    }
  }

  // Funkcja do włączenia/wyłączenia MFA (TOTP)
  const handleToggleMfa = async () => {
    try {
      if (mfaEnabled) {
        await user.disableTOTP()
        setMfaEnabled(false)
        setTotpSecret('')
        alert('MFA wyłączone')
      } else {
        const totp = await user.createTOTP()
        setTotpSecret(totp.secret || '')
        setMfaEnabled(true)
      }
    } catch (err) {
      alert(`Nie udało się przełączyć MFA: ${err}`)
    }
  }

  // Funkcja do usuwania konta
  const handleDeleteAccount = async () => {
    if (confirm('Czy na pewno chcesz usunąć konto? Tej operacji nie można cofnąć.')) {
      try {
        await user.delete()
        await signOut()
        alert('Konto usunięte')
      } catch (err) {
        alert(`Nie udało się usunąć konta: ${err}`)
      }
    }
  }

  // Funkcja do wylogowania
  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = '/sign-in'
    } catch (err) {
      alert(`Nie udało się wylogować: ${err}`)
    }
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
            <p className="text-muted-foreground mb-4">{user.primaryEmailAddress?.emailAddress}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openUserProfile()}>
                Edytuj profil (Clerk UI)
              </Button>
              <Button variant="destructive" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Wyloguj się
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="account">Konto</TabsTrigger>
            <TabsTrigger value="authentication">Uwierzytelnianie</TabsTrigger>
            <TabsTrigger value="devices">Urządzenia</TabsTrigger>
            <TabsTrigger value="security">Bezpieczeństwo</TabsTrigger>
            <TabsTrigger value="privacy">Prywatność</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informacje o koncie
                </CardTitle>
                <CardDescription>Zarządzaj szczegółami swojego konta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Imię i nazwisko</h3>
                    <p className="text-muted-foreground">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Główny email</h3>
                    <p className="text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Główny numer telefonu</h3>
                    <p className="text-muted-foreground">
                      {user.primaryPhoneNumber?.phoneNumber || 'Nie ustawiono'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Członek od</h3>
                    <p className="text-muted-foreground">
                      {new Date(user.createdAt ?? Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Metody uwierzytelniania
                </CardTitle>
                <CardDescription>Zarządzaj metodami logowania</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Adresy email</h3>
                    {user.emailAddresses.map((email) => (
                      <p key={email.id} className="text-muted-foreground">
                        {email.emailAddress}{' '}
                        {email.id === user.primaryEmailAddressId ? '(Główny)' : ''}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Numery telefonu</h3>
                    {user.phoneNumbers.map((phone) => (
                      <p key={phone.id} className="text-muted-foreground">
                        {phone.phoneNumber}{' '}
                        {phone.id === user.primaryPhoneNumberId ? '(Główny)' : ''}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Konta społecznościowe</h3>
                    {user.externalAccounts.map((account) => (
                      <p key={account.id} className="text-muted-foreground">
                        {account.provider} ({account.emailAddress || account.username})
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Aktywne urządzenia
                </CardTitle>
                <CardDescription>Zarządzaj aktywnymi sesjami</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{'Nieznane urządzenie'}</p>
                        <p className="text-muted-foreground text-sm">
                          Ostatnia aktywność: {new Date(session.lastActiveAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleSignOutSession(session.id)}
                      >
                        Wyloguj
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Ustawienia bezpieczeństwa
                </CardTitle>
                <CardDescription>Zarządzaj ustawieniami bezpieczeństwa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Zmień hasło</h3>
                    <div className="space-y-2 max-w-sm">
                      <Label htmlFor="new-password">Nowe hasło</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {passwordError && <p className="text-destructive text-sm">{passwordError}</p>}
                      <Button onClick={handleChangePassword}>Zaktualizuj hasło</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Uwierzytelnianie dwuskładnikowe</h3>
                    <p className="text-muted-foreground mb-2">
                      Status: {mfaEnabled ? 'Włączone' : 'Wyłączone'}
                    </p>
                    {mfaEnabled && totpSecret && (
                      <div className="mb-4">
                        <p>Zeskanuj ten kod QR w aplikacji uwierzytelniającej:</p>
                      </div>
                    )}
                    <Button onClick={handleToggleMfa}>
                      {mfaEnabled ? 'Wyłącz MFA' : 'Włącz MFA'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  Prywatność i usuwanie konta
                </CardTitle>
                <CardDescription>Zarządzaj ustawieniami prywatności</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Możesz trwale usunąć swoje konto. Tej operacji nie można cofnąć.
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Usuń konto
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="p-5">
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Tryb deweloperski</AlertTitle>
          <AlertDescription>
            Ten panel jest w trybie deweloperskim. Zalecamy użycie Clerk User Profile UI do pełnego
            zarządzania profilem.{' '}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
