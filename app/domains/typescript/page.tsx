"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import Link from "@/components/custom-elements/Link";
import { useCallback, useState } from "react";
import { useAsyncList } from "@react-stately/data";
import MainContainer from "@/components/MainContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";

const columns = [
  { name: "Topic", uid: "topic" },
  { name: "Difficulty", uid: "difficulty" },
  { name: "Last Reviewed", uid: "last_reviewed" },
  { name: "Next Review", uid: "next_review" },
  { name: "Actions", uid: "actions" },
];

const topics = [
  {
    id: 1,
    topic: "What is React?",
    difficulty: "easy",
    last_reviewed: "2023-01-01",
    next_review: "2024-03-01",
  },
  {
    id: 2,
    topic: "Why use a JavaScript build tool?",
    difficulty: "medium",
    last_reviewed: "2023-02-01",
    next_review: "2024-11-11",
  },
  {
    id: 3,
    topic: "Creating a React project",
    difficulty: "hard",
    last_reviewed: "2023-03-01",
    next_review: "2024-05-01",
  },
  {
    id: 4,
    topic: "Downleveling in TypeScript",
    difficulty: "medium",
    last_reviewed: "2023-03-01",
    next_review: "2024-05-01",
  },
];

const statusColorMap = {
  easy: "success",
  medium: "warning",
  hard: "danger",
};

// FIXME: Should all these `page` components be called `Home`?
export default function Home() {
  const [topicId, setTopicId] = useState(1);
  const [topicsLength, setTopicLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const renderCell = useCallback((topic, columnKey) => {
    const cellValue = topic[columnKey];

    switch (columnKey) {
      case "topic":
        return (
          <Link href={`/domains/typescript/topics/${topic.id}`}>
            {cellValue}
          </Link>
        );
      case "difficulty":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "last_reviewed":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "next_review":
        return (
          <Chip
            className="capitalize"
            size="sm"
            variant="flat"
            color={new Date(cellValue) < new Date() ? "danger" : "success"}
          >
            {/* FIXME: fix sorting by next_review */}
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex flex-row gap-2 items-center ml-2">
            <Tooltip content="Questions" offset={0} closeDelay={0}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-default-700">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </span>
            </Tooltip>
            <Tooltip content="Exercises" offset={0} closeDelay={0}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-default-700">
                <FontAwesomeIcon icon={faCode} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  let list = useAsyncList({
    async load({ signal }) {
      //   let res = await fetch("https://swapi.py4e.com/api/people/?search", {
      //     signal,
      //   });
      //   let json = await res.json();
      setIsLoading(false);

      return {
        // items: json.results,
        items: topics,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <>
      <MainContainer>
        <CustomBreadcrumbs>
          <BreadcrumbItem>
            <Link href="/" className="text-gray-600 hover:text-black">
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="font-bold">TypeScript</span>
          </BreadcrumbItem>
        </CustomBreadcrumbs>
        <Table
          aria-label="Sortable topics table"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          // selectionMode="single"
          isStriped
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting
              >
                {column.name.toUpperCase()}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={list.items}
            isLoading={isLoading}
            loadingContent={<p>Loading...</p>}
          >
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </MainContainer>
    </>
  );
}
