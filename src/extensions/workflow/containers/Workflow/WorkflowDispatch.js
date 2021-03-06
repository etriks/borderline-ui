import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { stateAware } from 'utilities/storeManager';
import WorkflowRenderer from './WorkflowRenderer';
import WorkflowCreator from './WorkflowCreator';

@stateAware(state => ({
    currentWorkflow: state.currentWorkflow,
    newWorkflow: state.newWorkflow
}))
class WorkflowDispatch extends Component {

    // Custom name for container
    static displayName = 'WorkflowDispatch';

    render() {
        const { match: { url }, currentWorkflow, newWorkflow } = this.props;
        return (
            <Switch>
                <Route path={`${url}/:particule`} render={(innerProps) => {
                    const innerMatch = innerProps.match;
                    if (innerMatch.params.particule === 'new') {
                        if (newWorkflow !== null)
                            return <Redirect to={`${url.replace(/\/$/, '')}/${newWorkflow}`} />;
                        return <WorkflowCreator />;
                    }
                    return <WorkflowRenderer {...innerProps} />;
                }} />
                <Route component={() => {
                    if (currentWorkflow === null)
                        return <Redirect to={`${url.replace(/\/$/, '')}/history`} />;
                    return <Redirect to={`${url}/${currentWorkflow}`} />;
                }} />
            </Switch>
        );
    }
}

export default WorkflowDispatch;
