import queryString from "query-string"
import { createSearchParams, useLocation, useParams } from "react-router-dom"

function useQueryParams() {

  const location = useLocation()
  const dynamicParams = useParams()

  return {
    queryParams: {
      // флаг withoutDynamicParams может быть, когда открывается страница по ссылке с поисковыми параметрами, в этом случае, поиск продуктов должен происходить исключительно по этим параметрам
      create(withoutDynamicParams) {
        let dataForCreatingSearchParams = { ...this.parse(location.search) }

        // если нет флага "withoutDynamicParams", тогда будут добавлены динамические параметры
        if (!withoutDynamicParams) {
          dataForCreatingSearchParams = {
            ...dataForCreatingSearchParams,
            ...dynamicParams
          }
        }

        return createSearchParams({
          ...dataForCreatingSearchParams,
          totalPages: null,
          navPop: true,
        })
      },

      parse(locationSearch) {
        return queryString.parse(locationSearch)
      },
    }
  }
}

export default useQueryParams