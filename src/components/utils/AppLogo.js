import React, { Fragment } from 'react'
import appLog from './logo.png'

const AppLogo = () => {
    return (
        <Fragment>
            <figure className="appLogo">
                <img src={appLog} alt="scritpchain logo" title="logo by K.T Motshoana." />
                <figcaption><h1><strong>Scriptchain</strong></h1></figcaption>
            </figure>
            <br />
            <em>a javascript blockchain emulator that applies the CAP theory.</em>
        </Fragment>
    )
}

export default AppLogo
