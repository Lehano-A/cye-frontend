import React from "react";
import { useSelector } from "react-redux";
import NotFoundPageError from "../Errors/NotFoundPageError";
import NoInternetConnectionError from "../Errors/NoInternetConnectionError";
import ApiTimeoutError from "../Errors/ApiTimeoutError";
import NotFoundProduct from "../Main/ModalProduct/NotFoundProduct/NotFoundProduct";
import { styled } from "@mui/material";
import StyledBoxAbsoluteCentered from "../../styled/StyledBoxAbsoluteCentered";


const StyledBoxNotFoundProduct = styled(StyledBoxAbsoluteCentered)(() => ({
  maxWidth: 'calc(100% - 64px)',
  width: '700px'

}))

/*
  Очищение стэйта текущей ошибки currentErrorApp происходит в моменты взаимодействия пользователя с интерфейсом:
  1) Клик на ButtonPagination
  2) Выбор варианта из выпадающего списка продуктов
  3) Поиск продукта через сабмит
  4) Клик по карточке продукта (открытие модального окна продукта)
  5) Закрытие модального окна продукта
  6) Клик по лого
*/
function withHandleErrors(WrappedComponent) {

  return () => {
    const currentErrorApp = useSelector((state) => state.errorsApp.currentErrorApp);


    return (
      currentErrorApp.status === 404 ?
        <NotFoundPageError />

        :

        currentErrorApp.name === "apiTimeout" ?
          <WrappedComponent ErrorComponent={ApiTimeoutError} />

          :

          currentErrorApp.name === "noInternetConnection" ?
            <WrappedComponent ErrorComponent={NoInternetConnectionError} />

            :

            currentErrorApp.name === "notFound" ?
              <WrappedComponent ErrorComponent={() => (
                <StyledBoxNotFoundProduct>
                  <NotFoundProduct message={currentErrorApp.message} />
                </StyledBoxNotFoundProduct>
              )} />
              :

              <WrappedComponent />
    )
  }
}

export default withHandleErrors