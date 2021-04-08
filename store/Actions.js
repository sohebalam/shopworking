export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
}

export const addToCart = (product, cart) => {
  const check = cart.every((item) => {
    return item._id !== product._id
  })
  if (!check) {
    return {
      type: "NOTIFY",
      payload: { error: "The product has been added to cart" },
    }
  }
  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] }
}
