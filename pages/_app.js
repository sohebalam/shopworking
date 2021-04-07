import "../styles/globals.css"

import { ServerStyleSheets, ThemeProvider } from "@material-ui/core"
import theme from "../theme"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  const sheets = new ServerStyleSheets()
  return sheets.collect(
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
