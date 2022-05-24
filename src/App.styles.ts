import styled from 'styled-components';

export const Container = styled.div`
  background-color: #27282F;
  color: #fff;
  min-height: 100vh;
`;

export const Area = styled.div`
  margin: auto;
  max-width: 980px;
  padding: 30px 10px;
`


export const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  
`

export const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
`

export const PhotoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
  gap: 10px;
  overflow: auto;
`

export const UploadForm = styled.form`
  background-color: #3D3F43;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;

  input {
    width: calc(50% - 25px);
  }

  input[type=submit]{
    background-color: #256DF4;
    border: 0;
    color: #FFF;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    margin: 0 20px;
    cursor: pointer;

    :hover{
      background-color: #856DF4;
    }
  }
`

export const Text = styled.h1`
  margin: 15px 0;
  font-size: 24px;
`