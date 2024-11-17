"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import {
  Button,
  Card,
  Spacer,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Link from "@/components/custom-elements/Link";
import H1 from "@/components/custom-elements/H1";
import SystemMessage from "@/components/SystemMessage";
import InputEmail from "@/components/custom-elements/InputEmail";
import InputText from "@/components/custom-elements/InputText";
import InputPassword from "@/components/custom-elements/InputPassword";
import { checkUserExists } from "@/hooks/useAuth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const checkIfPasswordsMatch = () => {
    if (password1 !== password2) {
      setMessage("Error: Passwords do not match.");
      setLoading(false);

      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const passwordsMatch = checkIfPasswordsMatch();

    if (!passwordsMatch) return;

    // Do not sign up if the user already exists
    if (await checkUserExists(email)) {
      setMessage("Error: User already exists.");
      setLoading(false);

      return;
    }

    // Sign up the user
    const { error } = await supabase.auth.signUp({
      email,
      password: password1,
      options: {
        data: {
          // FIXME: Should I sanitize the name?
          name: name,
        },
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Check your email for a confirmation link.");
      setSignUpSuccess(true);
    }

    setLoading(false);
  };

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <H1>Sign Up</H1>
      </CardHeader>
      <Divider />
      <CardBody>
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
        {!signUpSuccess && (
          <form onSubmit={handleSignUp} className="flex flex-col">
            <InputText
              isRequired
              text={name}
              setText={setName}
              label="Your Name"
              errorMessage="Please enter your name"
            />
            <Spacer y={3} />
            <InputEmail email={email} setEmail={setEmail} />
            <Spacer y={3} />
            <InputPassword password={password1} setPassword={setPassword1} />
            <Spacer y={3} />
            <InputPassword
              password={password2}
              setPassword={setPassword2}
              label="Repeat Your Password"
            />
            <Spacer y={3} />
            <Button type="submit" color="primary" size="lg" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        )}
      </CardBody>
      <Divider />
      {!signUpSuccess && (
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Link href="/authentication/signin">Sign In</Link>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
