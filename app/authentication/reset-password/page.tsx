import MainContainer from "@/components/MainContainer";
import ResetPassword from "@/components/authentication/ResetPassword";
import Navigation from "@/components/Navigation";

export default function ResetPasswordPage() {
  return (
    <>
      <Navigation renderTopicNavButtons={false} />
      <MainContainer>
        <ResetPassword />
      </MainContainer>
    </>
  );
}
