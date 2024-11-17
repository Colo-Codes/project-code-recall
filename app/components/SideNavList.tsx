import { Listbox, ListboxItem } from "@nextui-org/react";

export default function SideNavList({ selectedKeys, handleSetSelectedKeys }) {
  return (
    <Listbox
      aria-label=""
      variant="flat"
      className="border-1 rounded-lg"
      selectionMode="single"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSetSelectedKeys}
    >
      <ListboxItem
        key="new"
        className={selectedKeys.has("new") && "flex bg-blue-100 text-blue-900"}
      >
        What is TypeScript?
      </ListboxItem>
      <ListboxItem
        key="copy"
        className={selectedKeys.has("copy") && "bg-blue-100 text-blue-900"}
      >
        Why TypeScript?
      </ListboxItem>
      <ListboxItem
        key="edit"
        className={selectedKeys.has("edit") && "bg-blue-100 text-blue-900"}
      >
        Install and initialise TypeScript
      </ListboxItem>
      <ListboxItem
        key="delete"
        className={selectedKeys.has("delete") && "bg-blue-100 text-blue-900"}
      >
        Custom types: aliases, interfaces, enums and classes
      </ListboxItem>
    </Listbox>
  );
}
