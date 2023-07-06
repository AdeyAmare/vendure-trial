import '@/styles/globals.css'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: "https://demo.vendure.io/shop-api",
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }) {

  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
  </ApolloProvider>
  )
  
   
}
