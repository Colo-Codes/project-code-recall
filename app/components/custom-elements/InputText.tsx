/**
 * InputText component for text input with built-in validation.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The current text value.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setText - Function to update the text value.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.errorMessage - The error message to display if the input is invalid.
 *
 * @returns {JSX.Element} The rendered InputText component.
 */
import { Input } from "@nextui-org/react";

export default function InputText({
  text,
  setText,
  label,
  errorMessage,
  isRequired = false,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  errorMessage: string;
  isRequired?: boolean;
}) {
  return (
    <Input
      isRequired={isRequired}
      type="text"
      label={label}
      value={text}
      onValueChange={setText}
      validationBehavior="native"
      errorMessage={errorMessage}
    />
  );
}
