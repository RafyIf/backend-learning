const nested = (array, parentId = null) => {
  return array.reduce((r, e) => {
    let obj = Object.assign({}, e)
    if (parentId == e.parent) {
      let children = nested(array, e.id)
      if (children.length) obj.sub = children
      r.push(obj)
    }
    return r
  }, [])
}

module.exports = {
    nested
}

