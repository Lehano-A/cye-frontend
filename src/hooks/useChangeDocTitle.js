import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigationType, useParams } from "react-router-dom";
import loglevel from 'loglevel'
import changeDocTitle from "../helpers/changeDocTitle";
import { resetStatesApp } from "../redux/reducers/actions/common/resetStatesApp";
import { CHANGING_DOC_TITLE } from "../helpers/constants";

const log = loglevel.getLogger(CHANGING_DOC_TITLE)



function useChangeDocTitle() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigationType = useNavigationType()
  const params = useParams()
  const selectedCard = useSelector((state) => state.cardProduct.selectedCard)


  return () => {
    /*
      Памятка:
      location.key === default - это самый первый путь в стэке истории
    */

    log.debug(`
    Вызов хука: useChangeDocTitle

    Маршрут изменился на: "${location.pathname}"
    search: "${location.search}"
    docTitle: "${location.state?.store?.docTitle}"
    navigationType: "${navigationType}"
    window.history.state.idx: ${window.history.state.idx}
    location: `, location)


    /*
       Если главная страница и:
       1) при движении по истории назад или
       2) при переходе на главную страницу или
       3) при открытии главной страницы по ссылке

       Движение по истории.
       navigationType:
        1) PUSH - добавление нового пути в стэк истории
        2) POP - движение по истории "назад" или "вперёд", "обновление страницы" или "открытие страницы по ссылке"
    */
    if (location.pathname === "/" && (navigationType === "POP" || navigationType === "PUSH")) {
      log.debug(`
      Продолжение работы внутри хука: useChangeDocTitle

      Что произошло: изменение пути
      Сработало условие:
       1) движение по истории назад или
       2) переход на главную страницу или
       3) открытие главной страницы по ссылке

      pathname: ${location.pathname}
      navigationType: "${navigationType}
      `)

      changeDocTitle('/')
      dispatch(resetStatesApp())
      return
    }


    if (location.key !== "default") {
      log.debug(`
      Продолжение работы внутри хука: useChangeDocTitle

      Что произошло: изменение пути
      Сработало условие: если НЕ самый первый путь в стеке истории

      pathname: ${location.pathname}
      navigationType: "${navigationType}"
      `)

      // когда открыли страницу с модальным окном продукта по ссылке. Чтобы изменился docTitle, нужно ожидать ответа от сервера с данными продукта.
      if (selectedCard?.data) {
        log.debug(`
        Продолжение работы внутри хука: useChangeDocTitle

        Что произошло: страница открылась по ссылке с модальным окном продукта
        Что будем делать: изменять docTitle

        selectedCard: `, selectedCard)
        const { title } = selectedCard.data
        changeDocTitle(title)
        return
      }

      changeDocTitle(location.state?.store?.docTitle || "/")

      if (navigationType === 'POP') {
        log.debug(`
        Продолжение работы внутри хука: useChangeDocTitle

        Произошло движение НАЗАД или ВПЕРЁД по истории, ОБНОВЛЕНИЕ СТРАНИЦЫ или ОТКРЫТИЕ СТРАНИЦЫ ПО ССЫЛКЕ`)
      }
      return
    }



    if (location.key === 'default' && !selectedCard.data) {
      log.debug(`
      Продолжение работы внутри хука: useChangeDocTitle

      Что произошло: страница (без модала продукта) открылась по ссылке
      Что будем делать: изменять docTitle
    `)
      changeDocTitle(params.value ? params.value : '/')
      return
    }

  }
}

export default useChangeDocTitle