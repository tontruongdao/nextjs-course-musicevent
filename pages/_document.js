import Document, { Html, Head, Main, NextScript } from 'next/document'

// This document is created because 'next.js' does not have a root index.html like 
// React app, we want to insert the "modal" component in the root index.html file.

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument

// Reference
// https://nextjs.org/docs/advanced-features/custom-document
