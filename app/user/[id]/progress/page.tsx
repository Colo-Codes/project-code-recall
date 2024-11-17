import LearningProgress from "@/components/LearningProgress";
import Navigation from "@/components/Navigation";
import MainContainer from "@/components/MainContainer";
import Footer from "@/components/Footer";

export default async function Progress({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <>
      <Navigation renderTopicNavButtons={false} />
      <MainContainer>
        <h1
          className="
          text-center
          text-2xl
          font-bold
          text-gray-900
          dark:text-white
          mb-6
        "
        >
          User {id} progress
        </h1>
        <LearningProgress />
      </MainContainer>
      <Footer />
    </>
  );
}
