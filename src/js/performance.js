import React from 'react'
import Perf from 'react-addons-perf'

const STYLES = {
    perf_profiler : {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: '50px',
        top: '20px',
        padding: '10px',
        background: '#fff',
        border: 'solid 1px rgba(61, 64, 78, 0.12)',
        boxShadow: '0 4px 8px 0 rgba(0, 29, 52, 0.12)',
        textAlign: 'center',
        zIndex: '100000000',
        borderRadius: '5px'
    },
    h1 : {
        fontSize: '1.5em',
        fontWeight : 'normal'
    },
    close : {
        top : '0',
        right : '0',
        position: 'absolute'
    }
}

STYLES.perf_profiler_toggler = {
    ...STYLES.perf_profiler,
    top : '0px',
    padding: '0px',
    right: '0',
    left: '0',
    margin : 'auto',
    width: '50px'
}

class PerfProfiler extends React.Component {

    state = { started: false, show: false }

    toggle = () => {
        const { started } = this.state
        started ? Perf.stop() : Perf.start()
        this.setState({ started: !started })
    }

    printWasted = () => {
        const lastMeasurements = Perf.getLastMeasurements()
        this.setState({ show: false }, () => {
            Perf.printWasted(lastMeasurements)
        })
    }

    printOverall = () => {
        const lastMeasurements = Perf.getLastMeasurements()
        this.setState({ show: false }, () => {
            Perf.printInclusive(lastMeasurements)
        })
    }

    toggleProfiler = () => {
        this.setState((state) => ({ show: !state.show }))
    }

    getMarkup = () => {
        const { started, show } = this.state
        if (!show) {
            return (
                <div
                    style={STYLES.perf_profiler_toggler}
                    onClick={this.toggleProfiler}>
                    <i className='fl-expand'></i>
                </div>)
        }

        return (
            <div style={STYLES.perf_profiler}>
                <div onClick={this.toggleProfiler}><i className='fl-close' style={STYLES.close}></i></div>
                <h1 style={STYLES.h1}>Profiler</h1>
                <button className='button button--tertiary' onClick={this.toggle}>{started ? 'Stop' : 'Start'}</button>
                <button className='button button--tertiary' onClick={this.printWasted}>Print Wasted</button>
                <button className='button button--tertiary' onClick={this.printOverall}>Print Overall</button>
            </div>
        )
    }

    render () {
        return (<div>{this.getMarkup()}</div>)
    }

}

export default PerfProfiler
