import styled, { css } from "styled-components";

interface FilterButtonProps {
  active: string;
}

const StyledFilter = styled.div`
  border: 1px solid #add8e6;
  background-color: #add8e6;
  box-shadow: 2px 2px 5px rgba(196, 196, 196, 0.1);
  border-radius: 4px;
  padding: 0.4rem;
  display: flex;
  width: fit-content;
  gap: 0.4rem;
`;

const FilterButton = styled.button<FilterButtonProps>`
  background-color: #add8e6;
  border: none;
  ${(props) =>
    props.active === "true" &&
    css`
      background-color: white;
      color: black;
    `}

  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  &:hover:not(:disabled) {
    background-color: #add8e6;
    color: white;
  }
`;

export default function Filter({
  filterFields,
  handleFilterClick,
  activeFilter,
}: {
  filterFields: { label: string; value: string }[];
  handleFilterClick: (value: string) => void;
  activeFilter: string;
}) {
  return (
    <div>
      <StyledFilter>
        {filterFields.map((filter) => {
          return (
            <FilterButton
              key={filter.label}
              onClick={() => {
                handleFilterClick(filter.value);
              }}
              active={activeFilter === filter.value ? "true" : "false"}
            >
              {filter.value}
            </FilterButton>
          );
        })}
      </StyledFilter>
    </div>
  );
}
