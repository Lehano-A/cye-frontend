function forcedBlur() {
  setTimeout(() => { document.activeElement.blur() }, 0)
}

export default forcedBlur