import styled from "styled-components";

export const Container = styled.div`
  background-color: #3D3F43;
  border-radius: 10px;
  padding: 10px;
  

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  span {
    display: flex;
    justify-content: space-between;
    width: 100%;

    p {
      width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    span {
      width: 50%;
      display: flex;
      justify-content: flex-end;
      gap: 5px;
    }
  }

  a {
    color: #fff;
    text-decoration: none;

    :hover {
      color: #222;
    }
  }

  svg {

    cursor: pointer;

    &.deleteSVG{
      
      :hover{
        fill: #222;
      }
    }
  }
`