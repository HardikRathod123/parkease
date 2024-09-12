export type Role = 'admin' | 'manager' | 'user' | 'valet' | 'customer'

export type GetUserType = {
  uid: string
  roles: Role[]
}
