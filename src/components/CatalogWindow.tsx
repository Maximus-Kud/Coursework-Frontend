type Props = {
  setCatalogWindowIsOpen: (newState: boolean) => void,
}



function CatalogWindow(props: Props) {
  return (
    <div className="modal-overlay">
      <div id="catalog-window">
        <div id="pu-pu-pu">Пу пу пу...</div>
        <div id="financing">Похоже на эту часть не хватило финансирования</div>

        <svg className='close-button' onClick={() => props.setCatalogWindowIsOpen(false)} width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"/></svg>
      </div>
    </div>
  )
}


export default CatalogWindow;