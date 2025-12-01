import styles from "./Table.module.css";

const Table = ({ headers, data, columns }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((bodyItem, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{bodyItem[col] ?? ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;