import React from 'react'
import Layout from '../components/Layout/Layout'
import policy from '../policy.jpg'
const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src={policy}
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <p>add privacy policy</p>
        <p>add privacy policy</p>
        <p>add privacy policy</p>
        <p>add privacy policy</p>
        <p>add privacy policy</p>
        <p>add privacy policy</p>
        <p>add privacy policy</p>
      </div>
    </div>
  </Layout>
  )
}

export default Policy