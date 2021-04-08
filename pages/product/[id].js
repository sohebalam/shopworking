import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"
// import products from "../../products"
import Image from "next/image"
import { useRouter } from "next/router"

import { getData } from "../../utils/fetchData"
import { useState } from "react"

const useStyles = makeStyles({
  root: {
    height: 300,
  },
})

const addToCartHandler = () => {
  // setQty(qty + 1)
  // history.push(`/cart/${match.params.id}?qty=${qty}`)
}

const ProductDetail = (props) => {
  const [product, setProduct] = useState(props.product)

  const classes = useStyles()
  const router = useRouter()

  return (
    <div>
      <Box style={{ marginTop: "0.75rem" }}>
        <Link href="/">
          <Button variant="outlined">Go Back</Button>
        </Link>
      </Box>
      <h1>ProductPage </h1>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Image src={product?.selectedFile} height="400rem" width="600rem" />
          </Box>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <Box>
            <Typography component="h5" variant="h5">
              {product?.title}
            </Typography>

            <Typography style={{ marginTop: "1rem" }}>
              <strong>Price: ${product.price}</strong>
            </Typography>
            <Typography style={{ marginTop: "1rem" }}>
              Description: {product?.description}
            </Typography>
            <Typography style={{ marginTop: "1rem" }}>
              {/* Likes: <Likes product={product} /> */}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <Box padding="1rem">
            {" "}
            <Card className={classes.root}>
              <CardContent>
                <Typography color="textPrimary" gutterBottom>
                  <strong>Price: ${product?.price}</strong>
                </Typography>
                Course: MERN Beginner
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  onClick={addToCartHandler}
                  onSubmit={() => setQty(qty + 1)}
                  onClick={addToCartHandler}
                >
                  Add to Card
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductDetail

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`products/${id}`)
  return {
    props: { product: res },
  }
  //
}
