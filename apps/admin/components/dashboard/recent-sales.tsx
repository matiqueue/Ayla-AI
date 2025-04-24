import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { data } from '@/data/data'

export function RecentSales() {
  const users = data['recentSales'].users.slice(0, 5)

  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div className="flex items-center" key={user.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${user.id}.png`} alt="Avatar" />
            <AvatarFallback>
              {user.name.charAt(0)}
              {user.name.split(' ')[1]?.charAt(0) || ''}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.cash}</div>
        </div>
      ))}
    </div>
  )
}
