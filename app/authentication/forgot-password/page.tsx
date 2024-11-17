import MainContainer from "@/components/MainContainer";
import ForgotPassword from "@/components/authentication/ForgotPassword";
import Navigation from "@/components/Navigation";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navigation renderTopicNavButtons={false} />
      <MainContainer>
        <ForgotPassword />
      </MainContainer>
    </>
  );
}
