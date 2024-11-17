"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import {
  Button,
  Input,
  Spacer,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import H1 from "@/components/custom-elements/H1";
import SystemMessage from "@/components/SystemMessage";
import InputEmail from "@/components/custom-elements/InputEmail";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/authentication/reset-password`,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Check your email for a password reset link.");
      setResetEmailSent(true);
    }

    setLoading(false);
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
        {!resetEmailSent && (
          <form onSubmit={handleForgotPassword} className="flex flex-col">
            <InputEmail email={email} setEmail={setEmail} />
            <Spacer y={3} />
            <Button type="submit" color="primary" size="lg" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </CardBody>
      <Divider />
    </Card>
  );
}
