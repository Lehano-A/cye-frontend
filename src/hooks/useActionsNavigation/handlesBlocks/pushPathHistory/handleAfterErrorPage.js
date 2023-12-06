import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"



function handleAfterErrorPage(data) {

  const { pathData } = data

  return constructLocationConfig({
    withoutLocationState: true,
    withoutDocTitle: true,
    dataForPathname: { option: pathData.option }
  })

}

export default handleAfterErrorPage
