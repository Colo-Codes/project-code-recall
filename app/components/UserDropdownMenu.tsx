import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
  DropdownSection,
} from "@nextui-org/react";
import Link from "@/components/custom-elements/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faComment,
  faRightFromBracket,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function UserDropdownMenu({ user, signOutUser }) {
  const router = useRouter();

  // Safeguard: return null if user is not signed in
  if (!user) {
    return null;
  }

  // The user name can come from the DB (user.user_metadata.name) or from the cached localStorage (user.name)
  let userName = user?.name || user?.user_metadata?.name;
  userName =
    userName.length > 10 ? `${userName.substring(0, 10)}...` : userName;

  const handleLogOut = async () => {
    const loggedOut = await signOutUser(user);

    if (loggedOut) {
      // Reload the page to reset the state
      window.location.reload();
      return null;
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button
            variant="flat"
            className="bg-gray-600 text-white rounded-full py-6 pl-1 pr-3"
          >
            <User
              avatarProps={{
                showFallback: true,
                fallback: (
                  <FontAwesomeIcon
                    icon={faUser}
                    size="xl"
                    className="text-gray-700"
                  />
                ),
                size: "md",
                // FIXME: implement a way fo the user to upload their own avatar
                // src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              name={userName}
              className="truncate max-w-40 min-w-20"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection title="Learning" showDivider>
            <DropdownItem
              key="progress"
              startContent={<FontAwesomeIcon icon={faListCheck} />}
              // FIXME: use a real user here
            >
              <Link href="/user/1/progress">Learning Progress</Link>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Account">
            <DropdownItem
              key="settings"
              startContent={<FontAwesomeIcon icon={faGear} />}
            >
              My Settings
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              startContent={<FontAwesomeIcon icon={faComment} />}
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<FontAwesomeIcon icon={faRightFromBracket} />}
              onClick={handleLogOut}
            >
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
