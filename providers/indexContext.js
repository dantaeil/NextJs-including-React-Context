import { createContext, useContext, useReducer } from "react";

export const TableContext = createContext(null);
export const TableDispatchContext = createContext(null);

export function TableProvider({ children }) {
  const [table, dispatch] = useReducer(tableReducer, initialTable);

  return (
    <TableContext.Provider value={table}>
      <TableDispatchContext.Provider value={dispatch}>
        {children}
      </TableDispatchContext.Provider>
    </TableContext.Provider>
  );
}

function tableReducer(table, action) {
  switch (action.type) {
    case "added": {
      return [...table, action.payload];
    }
    case "deleted": {
      return table.filter((t) => t.id !== action.payload);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function useTable() {
  return useContext(TableContext);
}

export function useTableDispatch() {
  return useContext(TableDispatchContext);
}

const initialTable = [
  { id: 0, first: "Tom", last: "Jackson", handle: "@twitter" },
  { id: 1, first: "Dan", last: "Jins", handle: "@facebook" },
  { id: 2, first: "Yuri", last: "Kan", handle: "@yahoo" },
];
