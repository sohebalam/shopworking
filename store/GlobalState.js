import { createContext, useReducer, useEffect } from "react"
import { reducers } from "./Reducers"
import { getData } from "../utils/fetchData"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, cart: [], modal: {} }
  const [state, dispatch] = useReducer(reducers, initialState)
  const { cart } = state

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin")
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        })
      })
    }
  }, [])

  useEffect(() => {
    const cart_constant = JSON.parse(localStorage.getItem("cart_constant"))
    if (cart_constant) {
      dispatch({ type: "ADD_CART", payload: cart_constant })
    }
  }, [])

  useEffect(() => {
    // const __next__cart01_viat = JSON.parse(lo)
    localStorage.setItem("cart_constant", JSON.stringify(cart))
  }, [cart])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}
