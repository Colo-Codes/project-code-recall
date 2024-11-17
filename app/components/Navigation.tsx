"use client";

import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button, Spinner } from "@nextui-org/react";
import Link from "@/components/custom-elements/Link";
import UserDropdownMenu from "@/components/UserDropdownMenu";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const { user, signOutUser, loading } = useAuthenticatedUser();

  const isUserSignedIn = user?.id;

  const handleClickOnSignIn = () => {
    router.push("/authentication/signin");
  };

  const handleClickOnSignUp = () => {
    router.push("/authentication/signup");
  };

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      className="bg-gray-500 border-b border-gray-200 bg-opacity-10"
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <Link href="/">CodeRecall</Link>
        </p>
      </NavbarBrand>
      {loading ? (
        <Spinner />
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {isUserSignedIn && (
              <UserDropdownMenu user={user} signOutUser={signOutUser} />
            )}
          </NavbarItem>
          {!isUserSignedIn && (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={handleClickOnSignIn}
                >
                  Sign In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleClickOnSignUp}
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      )}
    </Navbar>
  );
}
