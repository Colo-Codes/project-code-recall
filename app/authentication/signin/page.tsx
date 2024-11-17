import MainContainer from "@/components/MainContainer";
import SignIn from "@/components/authentication/SignIn";
import Navigation from "@/components/Navigation";

export default function SignInPage() {
  return (
    <>
      <Navigation renderTopicNavButtons={false} />
      <MainContainer>
        <SignIn />
      </MainContainer>
    </>
  );
}
