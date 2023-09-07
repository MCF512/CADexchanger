import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { getCoordinates } from '../actions';
import styled from 'styled-components';
import { ACTION_TYPES } from '../store';

export const Form = () => {
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    height: yup.number().required(),
    radius: yup.number().required(),
    sections: yup.number().required(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(getCoordinates(data))
    reset()
  };

  const errorMessage = errors.height?.message || errors.radius?.message || errors.sections?.message;

  const ErrorMessage = styled.div`
    color: red;
  `;

  const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
  `;

  const StyledInput = styled.input`
    width: 400px;
    margin: 3px 0;
    padding: 5px;
    font-size: 12px;
  `

  const StyledButton = styled.button`
    background-color: gray;
    color: #fff;
    width: 400px;
    padding: 5px;
    margin-top: 5px;
  `;

  const StyledDiv = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const showWireframe = () => {
    dispatch({ type: ACTION_TYPES.CHANGE_WIREFRAME_VISIBILYTY })
  }

  return (
    <StyledDiv>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput {...register("height")} type="text" placeholder="Высота" />
        <StyledInput {...register("radius")} type="text" placeholder="Радиус" />
        <StyledInput {...register("sections")} type="text" placeholder="Количество секций" />
        <StyledButton>Отправить</StyledButton>
      </StyledForm>
      <StyledButton onClick={showWireframe}>Отображать линии</StyledButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledDiv>
  )
}