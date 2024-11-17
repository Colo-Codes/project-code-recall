/**
 * InputPassword is a custom password input component that allows users to toggle the visibility of the password.
 * It uses the `Input` component from `@nextui-org/react` and `FontAwesomeIcon` for the visibility toggle icons.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.password - The current password value.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setPassword - The function to update the password value.
 * @param {string} [props.label] - The label for the input field. Defaults to "Password" if not provided.
 *
 * @returns {JSX.Element} The rendered InputPassword component.
 */
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputPassword({
  password,
  setPassword,
  label,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      isRequired
      label={label || "Password"}
      type={isVisible ? "text" : "password"}
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      validationBehavior="native"
      errorMessage="Please enter a valid password"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="text-gray-400 pointer-events-none"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              className="text-gray-400 pointer-events-none"
            />
          )}
        </button>
      }
    />
  );
}
