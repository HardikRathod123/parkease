'use client'
import { useFormLogin } from '@parkease/forms/src/login'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Form } from '../atoms/Form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'

export interface ILoginFormProps {
  className?: string
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <div className={className}>
      <Form
        onSubmit={handleSubmit(async (data) => {
          const { email, password } = data
          setLoading(true)

          const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
          })
          setLoading(false)

          if (result?.ok) {
            replace('/')
          }
          if (result?.error) {
            alert('Login failed. Try again.')
          }
        })}
      >
        <HtmlLabel title="Email" error={errors.email?.message}>
          <HtmlInput
            {...register('email')}
            placeholder="email"
            className="text-black"
          />
        </HtmlLabel>
        <HtmlLabel title="Password" error={errors.password?.message}>
          <HtmlInput
            className="text-black"
            type="password"
            {...register('password')}
            placeholder="******"
          />
        </HtmlLabel>
        <Button type="submit" loading={loading}>
          Submit
        </Button>
        <div className="mt-4 text-sm">
          Do not have an parkease account?
          <br />
          <Link
            href="/register"
            className="font-bold underline underline-offset-4"
          >
            Create one
          </Link>{' '}
          now.
        </div>
      </Form>
    </div>
  )
}
