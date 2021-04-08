import { Container, Grid } from "@material-ui/core"
import { useState } from "react"

import ProductCard from "../components/ProductCard"
import { getData } from "../utils/fetchData"

export default function Home(props) {
  const [products, setProducts] = useState(props.products)
  // console.log(products)

  return (
    <>
      <h1>Latest Courses</h1>
      <Grid>
        {products?.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          <Grid container spacing={2} direction="row">
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
  const res = await getData("products/productRoute")

  // const data = await res.json()
  // console.log(data.length)
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  }
}
