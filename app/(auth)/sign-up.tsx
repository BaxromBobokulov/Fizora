import { AuthScreen } from "@/components/auth/AuthScreen";

export default function SignUp() {
  return (
    <AuthScreen
      mode="sign-up"
      title="Create your account"
      subtitle="Start exploring physics today! ✨"
      showPassword
      primaryLabel="Sign Up"
      footerPrompt="Already have an account?"
      footerActionLabel="Log in"
      footerHref="/(auth)/sign-in"
    />
  );
}
