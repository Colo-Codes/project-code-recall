// Navigation height: 65px
// Main container top margin: 40px
// Footer height: 97px
// Total: 202px
export default function MainContainer({ children }) {
  return (
    <main
      className="flex-auto max-w-[1000px] m-auto mt-10"
      style={{ minHeight: "calc(100vh - 202px)" }}
    >
      {children}
    </main>
  );
}
