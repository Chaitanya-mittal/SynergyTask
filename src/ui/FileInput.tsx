import styled from "styled-components";

const FileInput = styled.input.attrs(() => ({
  type: "file",
}))`
  font-size: 1rem;
  border-radius: 5px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.5rem 0.7rem;
    margin-right: 1rem;
    border-radius: 10px;
    border: none;
    color: white;
    background-color: blue;
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: lightblue;
    }
  }
`;

export default FileInput;
