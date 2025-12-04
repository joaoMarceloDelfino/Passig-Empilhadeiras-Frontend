import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import styles from "./Table.module.css";

const Table = ({ headers, data, columns, removeHandler, editHandler, viewHandler, isRemoveEnabled, isEditEnabled, isViewEnabled }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
            {
              (removeHandler || editHandler || viewHandler) && <th>Ações</th>
            }
          </tr>
        </thead>
        <tbody>
          {data.map((bodyItem, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{bodyItem[col] ?? ""}</td>
              ))}
              {
                (removeHandler || editHandler || viewHandler) &&
                <td>
                  {
                    viewHandler && 
                    <button onClick={() => viewHandler(rowIndex)} className={styles.acoesButton} style={{backgroundColor: "blue"}} disabled={isViewEnabled ? !isViewEnabled(rowIndex) : false}>
                      <FaEye/>
                    </button>
                  }
                  {
                    editHandler && 
                    <button onClick={editHandler} className={styles.acoesButton} style={{backgroundColor: "green"}} disabled={isEditEnabled ? !isEditEnabled(rowIndex) : false} >
                      <FaEdit/>
                    </button>
                  }
                  {
                    removeHandler && 
                    <button onClick={removeHandler} className={styles.acoesButton} style={{backgroundColor: "red"}} disabled={isRemoveEnabled ? !isRemoveEnabled(rowIndex) : false}>
                      <FaTrash/>
                    </button>
                  }
                </td> 
              }
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Table;