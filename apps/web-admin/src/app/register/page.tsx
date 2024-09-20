import { AuthLayout } from '@parkease/ui/src/components/molecules/AuthLayout'
import { RegisterForm } from '@parkease/ui/src/components/templates/RegisterForm'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
