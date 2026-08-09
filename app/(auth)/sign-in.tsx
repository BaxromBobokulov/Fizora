import { AuthScreen } from "@/components/auth/AuthScreen";

export default function SignIn() {
  return (
    <AuthScreen
      mode="sign-in"
      title="Welcome back"
      subtitle="Log in to continue exploring physics! ✨"
      showPassword={false}
      primaryLabel="Log In"
      footerPrompt="Don't have an account?"
      footerActionLabel="Sign up"
      footerHref="/(auth)/sign-up"
    />
  );
}
