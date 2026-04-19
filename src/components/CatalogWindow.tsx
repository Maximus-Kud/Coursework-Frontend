type Props = {
  setCatalogWindowIsOpen: (newState: boolean) => void,
}



function CatalogWindow(props: Props) {
  return (
    <div id="catalog-window">
      <div id="pu-pu-pu">Пу пу пу...</div>
      <div id="financing">Финансирования не хватило на эту часть</div>

      <svg className='close-button' onClick={() => props.setCatalogWindowIsOpen(false)} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
    </div>
  )
}


export default CatalogWindow;