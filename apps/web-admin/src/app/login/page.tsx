import { AuthLayout } from '@parkease/ui/src/components/molecules/AuthLayout'
import { LoginForm } from '@parkease/ui/src/components/templates/LoginForm'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}
