import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function SystemMessage({ type, children }) {
  if (type === "success") {
    return (
      <div className="flex gap-3 items-center text-green-600 bg-green-100 p-3 rounded-lg">
        <FontAwesomeIcon icon={faCircleCheck} />
        {children}
      </div>
    );
  }
  if (type === "error") {
    return (
      <div className="flex gap-3 items-center text-red-600 bg-red-100 p-3 rounded-lg">
        <FontAwesomeIcon icon={faCircleExclamation} />
        {children}
      </div>
    );
  }
}
