/**
 * InputEmail component for email input with built-in validation.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.email - The current email value.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setEmail - Function to update the email value.
 *
 * @returns {JSX.Element} The rendered InputEmail component.
 */
import { Input } from "@nextui-org/react";

export default function InputEmail({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Input
      // FIXME: MAke required a prop
      isRequired
      type="email"
      label="Email"
      value={email}
      onValueChange={setEmail}
      validationBehavior="native"
      errorMessage="Please enter a valid email"
    />
  );
}
