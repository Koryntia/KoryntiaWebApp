import styled from "styled-components";

export const Spinner = styled.span`
  justify-content: center;
  align-items: center;
  border: 2px solid #f3f3f3;
  border-top: 2px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
`;