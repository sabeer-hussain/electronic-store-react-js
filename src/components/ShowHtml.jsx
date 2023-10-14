import parse, { attributesToProps, domToReact } from "html-react-parser";
import { Table } from "react-bootstrap";

const ShowHtml = ({ htmlText }) => {
  /*
  const replaceHtmlWithReact = (node) => {
    if (node.name === "table") {
      const props = attributesToProps(node.attribs);
      return (
        <Table {...props} striped bordered responsive>
          {domToReact(node.children, { replace: replaceHtmlWithReact })}
        </Table>
      );
    }
  };

  const changeHtmlData = () => {
    return parse(htmlText, {
      replace: replaceHtmlWithReact,
    });
  };
  */

  const changeHtmlData = () => {
    return parse(htmlText, {
      replace: (node) => {
        // change
        if (node.name === "table") {
          node.attribs.class +=
            " table table-bordered table-hover table-striped";
          return node;
        }
        return node;
      },
    });
  };

  return <div>{changeHtmlData(htmlText)}</div>;
};

export default ShowHtml;
