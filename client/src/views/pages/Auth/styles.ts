import styled from "styled-components";
import bg from "../../../images/main_bg.jpg";

export const WrapForm = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cececece;
  position: fixed;
  background: url(${bg}) center;
  background-size: cover;

  form {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);

    h1 {
      text-align: center;
    }
  }
`;
