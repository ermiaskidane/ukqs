
type Props = {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {

  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  )
}

export default AuthLayout