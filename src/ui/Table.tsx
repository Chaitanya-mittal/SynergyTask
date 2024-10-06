import { createContext, useContext, ReactNode } from "react";
import styled from "styled-components";

interface CommonRowProps {
  columns: string;
  children: ReactNode;
}

interface TableProps {
  children: ReactNode;
  columns: string;
}

interface BodyProps<T> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}

interface FooterProps {
  children: ReactNode;
}

const StyledTable = styled.div<CommonRowProps>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  font-size: 1rem;
  border-radius: 7px;
  width: 100%;
  max-width: 80rem;
  display: grid;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 1rem;
  background-color: lightblue;
  border-bottom: 1px solid lightblue;
  text-transform: capitalize;
  letter-spacing: 0.4px;
  font-weight: 600;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 1rem;
  border-bottom: 1px solid rgba(196, 196, 196, 0.5);
`;

const StyledBody = styled.section`
  margin: 0.2rem 0;
  background-color: white;
  & > div:last-child {
    border-bottom: none;
  }
`;

const StyledFooter = styled.footer`
  background-color: lightblue;
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextProps {
  columns: string;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

function Table({ children, columns }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table" columns={columns}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  const context = useContext(TableContext);
  if (!context) throw new Error("Header must be used within a Table");
  const { columns } = context;
  return (
    <StyledHeader as="header" role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }: { children: ReactNode }) {
  const context = useContext(TableContext);
  if (!context) throw new Error("Row must be used within a Table");

  const { columns } = context;
  return (
    <StyledRow columns={columns} role="row">
      {children}
    </StyledRow>
  );
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) return <Empty>No Data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Footer({ children }: FooterProps) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
