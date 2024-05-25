import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPages/ErrorPage";



function withErrorPage(WrappedComponent) {

  return () => {
    const pageWithError = useSelector((state) => state.navigation.pageWithError);

    return (
      pageWithError.status === 404 ? <ErrorPage /> : <WrappedComponent />
    )
  }
}

export default withErrorPage
