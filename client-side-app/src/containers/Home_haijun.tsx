import React, {Fragment} from 'react'
import { TWConfigProvider, TWChart } from "tw-react-components";
import { withSiteData } from 'react-static';

interface State {
    geo: string
}

class Home extends React.Component<{}, State> {

    constructor(props: any) {
        super(props)
        this.state = {
            geo: "中国|广西|桂林市|秀峰区|941b259e"
        }
    }

    render() {
        return (<Fragment>
            {typeof window !== 'undefined' && (
                <TWConfigProvider>
                    <div className={"mainChart"}>
                        <TWChart 
                            geo={this.state.geo} 
                            metric={["az", { metricName: "state", type: "colormap" }]}
                            resolution="1s"
                            from={new Date().getTime()-60000}
                            to={new Date().getTime()}/>
                    </div>
                </TWConfigProvider>
            )}
        </Fragment>)
    }
    
}


export default withSiteData(Home)
