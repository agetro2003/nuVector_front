function CbEdit(props) {
    let items = props.options
return(
    items.map((option, index) => (
        <option key={index} value={option.code}>
          {option.name}
        </option>
      ))
)
    
}

export default CbEdit