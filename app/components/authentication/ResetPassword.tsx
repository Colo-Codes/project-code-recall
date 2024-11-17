"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import {
  Button,
  Spacer,
  Card,
  CardHeader,
  Divider,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import H1 from "@/components/custom-elements/H1";
import SystemMessage from "@/components/SystemMessage";
import InputPassword from "@/components/custom-elements/InputPassword";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionSet, setSessionSet] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Parse the URL hash fragment to extract the tokens
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove the '#' at the beginning
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      // Set the session
      supabase.auth
        .setSession({
          access_token,
          refresh_token,
        })
        .then(({ data, error }) => {
          if (error) {
            setMessage(`Error: ${error.message}`);
            setLoading(false);
            setErrorPresent(true);
          } else {
            setSessionSet(true);
          }
        });
    } else {
      setMessage("Error: Invalid or missing access token");
      setLoading(false);
      setErrorPresent(true);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(`Error: ${error.message}`);
        setErrorPresent(true);
      } else {
        // FIXME: this message should be displayed in the SingIn page
        setMessage("Password updated successfully! Redirecting...");
        setRedirecting(true);
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      setErrorPresent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <H1>Reset password</H1>
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
        {sessionSet && !redirecting ? (
          <form onSubmit={handleResetPassword} className="flex flex-col">
            <InputPassword
              password={password}
              setPassword={setPassword}
              label="New Password"
            />
            <Spacer y={3} />
            <Button type="submit" color="primary" size="lg" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        ) : (
          !errorPresent && <Spinner />
        )}
      </CardBody>
    </Card>
  );
}
