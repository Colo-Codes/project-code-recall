"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Button,
  Spacer,
  Card,
  CardHeader,
  CardFooter,
  Divider,
  CardBody,
  Checkbox,
} from "@nextui-org/react";
import Link from "@/components/custom-elements/Link";
import H1 from "@/components/custom-elements/H1";
import InputEmail from "@/components/custom-elements/InputEmail";
import InputPassword from "@/components/custom-elements/InputPassword";
import SystemMessage from "@/components/SystemMessage";
import { useAuthenticatedUser } from "@/context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { user, setUser, signOutUser } = useAuthenticatedUser();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(">>> SignIn | Signed in successfully!");
      setRedirecting(true);
      setUser(data.user);
      // FIXME: Should redirect to the previous page? User profile? Dashboard?
      router.push("/");
    }

    setLoading(false);
  };

  const alreadySignedIn = !!user?.id && !redirecting && (
    <>
      <SystemMessage type="success">You are already signed in!</SystemMessage>
      <Spacer y={3} />
      <Link href="/">Go to the homepage</Link>
      <Spacer y={3} />
      <Button
        type="submit"
        color="primary"
        size="lg"
        disabled={loading}
        onClick={() => signOutUser(user)}
      >
        Sign Out
      </Button>
    </>
  );

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <H1>Sign In</H1>
      </CardHeader>
      <Divider />
      <CardBody>
        {alreadySignedIn || null}
        {message && (
          <>
            <Spacer y={1} />
            <SystemMessage
              type={message.startsWith("Error") ? "error" : "success"}
            >
              {message}
            </SystemMessage>
            <Spacer y={3} />
          </>
        )}
        {!redirecting && !alreadySignedIn && (
          <form onSubmit={handleSignIn} className="flex flex-col">
            <InputEmail email={email} setEmail={setEmail} />
            <Spacer y={3} />
            <InputPassword password={password} setPassword={setPassword} />

            <div className="ml-auto mr-0 mt-2">
              <Link href="/authentication/forgot-password">
                Forgot password?
              </Link>
            </div>
            <Spacer y={3} />
            {/* FIXME: Implement Remember Me feature
            <Checkbox>Remember me</Checkbox>
            <Spacer y={3} />
             */}
            <Button type="submit" color="primary" size="lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        )}
      </CardBody>
      {!redirecting && !alreadySignedIn && (
        <>
          <Divider />
          <CardFooter>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/authentication/signup">Sign Up</Link>
            </p>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
