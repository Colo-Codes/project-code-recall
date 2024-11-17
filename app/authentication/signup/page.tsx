import MainContainer from "@/components/MainContainer";
import SignUp from "@/components/authentication/SignUp";
import Navigation from "@/components/Navigation";

export default function SignUpPage() {
  return (
    <>
      <Navigation renderTopicNavButtons={false} />
      <MainContainer>
        <SignUp />
      </MainContainer>
    </>
  );
}
