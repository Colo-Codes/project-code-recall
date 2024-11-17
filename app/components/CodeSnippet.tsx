import { Prism } from "react-syntax-highlighter";

function CodeSnippet({
  language,
  children,
  highlightedLineStart = 0,
  highlightedLineEnd = 0,
}) {
  const lineProps = (lineNumber) => {
    let style = { display: "block" };
    if (
      lineNumber >= highlightedLineStart &&
      lineNumber <= highlightedLineEnd
    ) {
      style.backgroundColor = "#e8e8e8";
    }
    return { style };
  };

  // Remove last \n from children that creates an extra empty line on rendered code block
  children = children.replace(new RegExp("\n" + "$"), "");

  return (
    <>
      <Prism
        language={language}
        showLineNumbers
        wrapLines
        lineProps={lineProps}
        customStyle={{
          lineHeight: "1.5",
          fontSize: ".9rem",
          borderRadius: "15px",
          backgroundColor: "#f7f7f7",
          padding: "20px",
          marginTop: "16px",
        }}
      >
        {children}
      </Prism>
    </>
  );
}

export default CodeSnippet;
