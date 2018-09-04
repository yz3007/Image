
import React, {Fragment} from "react"
import { Router} from "react-static"
import { hot } from "react-hot-loader"
import Routes from 'react-static-routes'

import "./styles/style.scss"

export default hot(module)(() => (
    <Router>                
        <Fragment>
            <Routes/>             
        </Fragment>
    </Router>
))
