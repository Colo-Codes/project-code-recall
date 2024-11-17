"use client";

import Navigation from "./components/Navigation";
import MainContainer from "./components/MainContainer";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <MainContainer>
        <Card
          className="py-4"
          isHoverable
          isPressable
          onPress={() => router.push("/domains/typescript")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Frontend/Backend</p>
            <small className="text-default-500">31 Topics</small>
            <h4 className="font-bold text-large">TypeScript</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="TypeScript code screenshot"
              className="object-cover rounded-xl"
              src="/domains/typescript/ts-screenshot.png"
              width={270}
              height={270}
            />
          </CardBody>
        </Card>
      </MainContainer>
      <Footer />
    </>
  );
}
