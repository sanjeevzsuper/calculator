import "./history.styles.css";

interface IHistoryProps {
  data: string[];
  onClearClick?: () => void;
}

const History = (props: IHistoryProps) => {
  const { data, onClearClick = () => {} } = props;

  const renderExpression = (expression: string) => {
    // Split into parts and replace "^" with superscript
    const parts = expression.split(/(\^\d+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("^")) {
        return <sup key={index}>{part.slice(1)}</sup>;
      }
      return <span key={index}>{part}</span>; // Render normal text
    });
  };

  return (
    <div className="historyContainer">
      {data.map((value, index) => (
        <div className="historyItem" key={`${value}-${index}`}>
          {renderExpression(value)}
        </div>
      ))}
      <button disabled={data.length === 0} onClick={onClearClick}>
        Clear
      </button>
    </div>
  );
};

export default History;
