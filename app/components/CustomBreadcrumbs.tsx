import { Breadcrumbs } from "@nextui-org/react";

export default function CustomBreadcrumbs({
  children,
  chip,
}: {
  children: React.ReactNode;
  chip?: React.ReactNode;
}) {
  return (
    <div className="flex gap-10 items-center mb-5">
      <Breadcrumbs variant="solid">{children}</Breadcrumbs>
      {chip}
    </div>
  );
}
