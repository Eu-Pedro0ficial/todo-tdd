import { ReactNode } from "react";

export function ListContainer({children}: {children:ReactNode}){

  return (
    <ul data-testid="list">
      {children}
    </ul>
  )
}
