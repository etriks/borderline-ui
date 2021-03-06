import React, { Component } from 'react';
import { default as T } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { stateAware } from 'utilities/storeManager';
import StepCreator from './StepCreator';
import StepRenderer from './StepRenderer';
import { actions } from '../../flux';

@stateAware(state => ({
    stepsLastLoaded: state.stepsLastLoaded,
    stepsListLoading: state.stepsListLoading,
    stepsList: state.stepsList[state.currentWorkflow] || {},
    currentStep: state.currentStep,
    currentWorkflow: state.currentWorkflow
}))
class StepLoader extends Component {

    // Custom name for container
    static displayName = 'StepLoader';

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };

    componentDidMount() {
        this.load();
    }

    componentDidUpdate() {
        this.load();
    }

    load = () => {
        const { stepsListLoading, stepsLastLoaded, currentWorkflow, currentStep, match } = this.props;
        if (stepsListLoading === false && stepsLastLoaded.getTime() === new Date(0).getTime()) {
            this.context.dispatch(actions.stepsListLoad(currentWorkflow));
            return;
        }

        if (currentStep !== null && currentStep !== match.params.sid)
            this.context.dispatch(actions.stepLoad(match.params.sid));
    }

    render() {
        const { stepsListLoading, stepsLastLoaded, stepsList, currentStep, match } = this.props;
        if (stepsListLoading === false && stepsLastLoaded.getTime() === new Date(0).getTime())
            return null;
        if (Object.keys(stepsList).length === 0 && stepsLastLoaded.getTime() !== new Date(0).getTime())
            return <StepCreator root />;
        if (currentStep === null)
            return null;
        if (match.params.sid === undefined || match.params.sid === null)
            return <Redirect to={`${match.url}/step/${currentStep}`} />;
        return <StepRenderer match={match} />;
    }
}

export default StepLoader;
