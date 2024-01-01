import { ReactNode, createContext, useState } from "react";

type DataContextType = {
  data: string[],
  setData: (data: string[]) => void
}

export const DataContext = createContext({} as DataContextType);

function DataProvider({children}:{children: ReactNode}){

  const [data, setData] = useState<string[]>([]);

  return (
    <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  )

}

export default DataProvider;

