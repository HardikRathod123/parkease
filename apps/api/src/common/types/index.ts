export type Role = 'admin' | 'manager' | 'user'

export type GetUserType = {
  uid: string
  roles: Role[]
}
