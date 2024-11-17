"use client";

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
} from "@nextui-org/react";
import Link from "@/components/custom-elements/Link";
import { useCallback, useState } from "react";
import { useAsyncList } from "@react-stately/data";

const columns = [
  { name: "Topic", uid: "topic" },
  { name: "Difficulty", uid: "difficulty" },
  { name: "Last Reviewed", uid: "last_reviewed" },
  { name: "Next Review", uid: "next_review" },
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
];

const statusColorMap = {
  easy: "success",
  medium: "warning",
  hard: "danger",
};

export default function LearningProgress({ params }) {
  const [isLoading, setIsLoading] = useState(true);

  const renderCell = useCallback((topic, columnKey) => {
    const cellValue = topic[columnKey];

    switch (columnKey) {
      case "topic":
        return <Link href="#">{cellValue}</Link>;
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
    <div className="max-w-[900px] m-auto mt-4">
      <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Learning Progress section
      </h1>
      <Card>
        <CardBody>
          <div className="flex">
            <div className="mr-4">
              <h2
                className="
                text-5xl
                font-bold
                text-gray-300
                dark:text-white 
              "
              >
                75%
              </h2>
            </div>
            <div className="flex-1">
              <h1
                className="
                font-bold
              "
              >
                TypeScript
              </h1>
              <Progress size="lg" aria-label="Progress " value={75} />
            </div>
          </div>
        </CardBody>
      </Card>
      <br></br>

      <Table
        aria-label="Sortable topics table"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        selectionMode="single"
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
    </div>
  );
}
