import { api } from 'api';
import { of } from 'rxjs';
import { mergeMap, mapTo, map } from 'rxjs/operators';
import NavigationButton from './containers/NavigationButton';
import View from './containers/View';

const types = {

    STEPS_LIST_LOAD: 'STEPS_LIST_LOAD',
    STEPS_LIST_LOAD_SUCCESS: 'STEPS_LIST_LOAD_SUCCESS',
    STEPS_LIST_LOAD_FAILURE: 'STEPS_LIST_LOAD_FAILURE',
    STEP_LOAD: 'STEP_LOAD',
    STEP_LOAD_SUCCESS: 'STEP_LOAD_SUCCESS',
    STEP_LOAD_FAILURE: 'STEP_LOAD_FAILURE',
    STEP_CREATE: 'STEP_CREATE',
    STEP_CREATE_FOLLOWUP: 'STEP_CREATE_FOLLOWUP',
    STEP_CREATE_SUCCESS: 'STEP_CREATE_SUCCESS',
    STEP_CREATE_FAILURE: 'STEP_CREATE_FAILURE',
    STEP_UPDATE: 'STEP_UPDATE',
    STEP_UPDATE_SUCCESS: 'STEP_UPDATE_SUCCESS',
    STEP_UPDATE_FAILURE: 'STEP_UPDATE_FAILURE',
    STEP_TYPE_DOCK: 'STEP_TYPE_DOCK',
    STEP_STATUS_UPDATE: 'STEP_STATUS_UPDATE',
    STEP_FETCH: 'STEP_FETCH',
    STEP_RESULT: 'STEP_RESULT',
    STEP_PREPARE_NEXT: 'STEP_PREPARE_NEXT',
    WORKFLOWS_LIST_LOAD: 'WORKFLOWS_LIST_LOAD',
    WORKFLOWS_LIST_LOAD_SUCCESS: 'WORKFLOWS_LIST_LOAD_SUCCESS',
    WORKFLOWS_LIST_LOAD_FAILURE: 'WORKFLOWS_LIST_LOAD_FAILURE',
    WORKFLOW_LOAD: 'WORKFLOW_LOAD',
    WORKFLOW_LOAD_SUCCESS: 'WORKFLOW_LOAD_SUCCESS',
    WORKFLOW_LOAD_FAILURE: 'WORKFLOW_LOAD_FAILURE',
    WORKFLOW_CREATE: 'WORKFLOW_CREATE',
    WORKFLOW_CREATE_SUCCESS: 'WORKFLOW_CREATE_SUCCESS',
    WORKFLOW_CREATE_FAILURE: 'WORKFLOW_CREATE_FAILURE',
    WORKFLOW_PIN: 'WORKFLOW_PIN',
    WORKFLOW_UNPIN: 'WORKFLOW_UNPIN'
};

export const actions = {

    dockToPager: () => ({
        type: '@@core/pager/PAGE_DOCK',
        path: 'workflow',
        icon: NavigationButton,
        view: View
    }),

    stepLoad: (step) => ({
        type: types.STEP_LOAD,
        step: step
    }),

    stepFetch: (action, state) => ({
        type: `@@extensions/${action.__origin__}/${action.replyTo}`,
        step: state.stepsList[state.currentWorkflow][state.currentStep]
    }),

    stepPrepareNext: () => ({
        type: types.STEP_PREPARE_NEXT
    }),

    stepProcessResults: () => ({
        type: types.STEP_PROCESS_RESULTS
    }),

    stepCreate: (eid) => ({
        type: types.STEP_CREATE,
        step: {
            extension: eid
        }
    }),

    stepCreateFollowup: (eid) => ({
        type: types.STEP_CREATE_FOLLOWUP,
        eid: eid
    }),

    stepCreateAborted: () => ({
        type: types.STEP_CREATE_ABORTED
    }),

    stepCreateSuccess: (data) => ({
        type: types.STEP_CREATE_SUCCESS,
        data: data
    }),

    stepCreateFailure: (data) => ({
        type: types.STEP_CREATE_FAILURE,
        data: data
    }),

    stepUpdate: (step) => ({
        type: types.STEP_UPDATE,
        step: step
    }),

    stepUpdateSuccess: (data) => ({
        type: types.STEP_UPDATE_SUCCESS,
        data: data
    }),

    stepUpdateFailure: (data) => ({
        type: types.STEP_UPDATE_FAILURE,
        data: data
    }),

    stepsListLoad: (workflow) => ({
        type: types.STEPS_LIST_LOAD,
        workflow: workflow
    }),

    stepsListLoadSuccess: (data) => ({
        type: types.STEPS_LIST_LOAD_SUCCESS,
        data: data
    }),

    stepsListLoadFailure: (data) => ({
        type: types.STEPS_LIST_LOAD_FAILURE,
        data: data
    }),

    workflowsListLoad: () => ({
        type: types.WORKFLOWS_LIST_LOAD
    }),

    workflowsListLoadSuccess: (data) => ({
        type: types.WORKFLOWS_LIST_LOAD_SUCCESS,
        data: data
    }),

    workflowsListLoadFailure: (data) => ({
        type: types.WORKFLOWS_LIST_LOAD_FAILURE,
        data: data
    }),

    workflowLoad: (wid) => ({
        type: types.WORKFLOW_LOAD,
        workflow: wid
    }),

    workflowLoadSuccess: (data) => ({
        type: types.WORKFLOW_LOAD_SUCCESS,
        workflow: data
    }),

    workflowLoadFailure: (data) => ({
        type: types.WORKFLOW_LOAD_FAILURE,
        data: data
    }),

    workflowCreate: (data) => ({
        type: types.WORKFLOW_CREATE,
        workflow: data
    }),

    workflowCreateSuccess: (data) => ({
        type: types.WORKFLOW_CREATE_SUCCESS,
        workflow: data
    }),

    workflowCreateFailure: (data) => ({
        type: types.WORKFLOW_CREATE_FAILURE,
        data: data
    }),

    workflowPin: (wid) => ({
        type: types.WORKFLOW_PIN,
        workflow: wid
    }),

    workflowUnpin: (wid) => ({
        type: types.WORKFLOW_UNPIN,
        workflow: wid
    })
};

export const epics = {

    enclaveBoot:
        (action) => action.ofType('START')
            .pipe(mapTo(actions.dockToPager())),


    stepsListLoad:
        (action) => action.ofType(types.STEPS_LIST_LOAD)
            .pipe(mergeMap((action) =>
                api.fetchStepsList(action.workflow)
                    .pipe(map(response => response.ok === true ? actions.stepsListLoadSuccess(response.data) : actions.stepsListLoadFailure(response.data)))
            )),

    stepCreate:
        (action, state) => action.ofType(types.STEP_CREATE)
            .pipe(mergeMap((action) => {
                const step = Object.assign({}, action.step, { parent: state.currentStep, context: { input: state.followingStepInput } });
                if (state.workflowLoading === true || state.workflowsListLoading === true || state.stepsListLoading === true)
                    return of(actions.stepCreateAborted());
                return api.createStep(state.currentWorkflow, step)
                    .pipe(map(response => response.ok === true ? actions.stepCreateSuccess(response.data) : actions.stepCreateFailure(response.data)));
            })),

    stepCreateFollowup:
        (action, state) => action.ofType(types.STEP_CREATE_FOLLOWUP)
            .pipe(mergeMap((action) => {
                const inputs = state.stepTypes[action.eid].inputs;
                const compat = inputs.filter(value => -1 !== state.currentOutputs.indexOf(value));
                if (compat.length <= 0)
                    return of(actions.stepCreateAborted());
                return of({ type: `@@extensions/${state.stepsList[state.currentWorkflow][state.currentStep].extension.split('/')[0]}/FETCH_STEP_RESULT`, format: compat[0] });
            })),

    workflowsListLoad:
        (action) => action.ofType(types.WORKFLOWS_LIST_LOAD)
            .pipe(mergeMap(() =>
                api.fetchWorkflowsList()
                    .pipe(map(response => response.ok === true ? actions.workflowsListLoadSuccess(response.data) : actions.workflowsListLoadFailure(response.data)))
            )),

    workflowCreate:
        (action) => action.ofType(types.WORKFLOW_CREATE)
            .pipe(mergeMap((action) =>
                api.createWorkflow(action.workflow)
                    .pipe(map(response => response.ok === true ? actions.workflowCreateSuccess(response.data) : actions.workflowCreateFailure(response.data)))
            )),

    workflowLoad:
        (action) => action.ofType(types.WORKFLOW_LOAD)
            .pipe(mergeMap((action) =>
                api.loadWorkflow(action.workflow)
                    .pipe(map(response => response.ok === true ? actions.workflowLoadSuccess(response.data) : actions.workflowLoadFailure(response.data)))
            )),

    stepFetch:
        (action, state) => action.ofType(types.STEP_FETCH)
            .pipe(mergeMap((action) => of(actions.stepFetch(action, state)))),

    stepUpdate:
        (action) => action.ofType(types.STEP_UPDATE)
            .pipe(mergeMap((action) =>
                api.updateStep(action.step)
                    .pipe(map(response => response.ok === true ? actions.stepUpdateSuccess(response.data) : actions.stepUpdateFailure(response.data)))
            )),

    stepPrepareNext:
        (action, state) => action.ofType(types.STEP_PREPARE_NEXT)
            .pipe(mergeMap(() => of({ type: `@@extensions/${state.stepsList[state.currentWorkflow][state.currentStep].extension.split('/')[0]}/EXECUTE_STEP` }))),

    stepResult:
        (action, state) => action.ofType(types.STEP_RESULT)
            .pipe(mergeMap(() => of(actions.stepCreate(state.followingStepType))))
};

const initial = {
    currentOutputs: [null],
    currentWorkflow: null,
    currentStep: null,
    currentStepStatus: null,
    followingStepType: null,
    followingStepInput: null,
    newWorkflow: null,
    newStep: null,
    stepsListLoading: false,
    stepsLastLoaded: new Date(0),
    stepsList: {},
    stepsTree: [],
    stepsStatuses: {},
    stepTypes: {},
    workflowsListLoading: false,
    workflowsLastLoaded: new Date(0),
    workflowsList: {},
    workflowLoading: false,
    workflowPins: {}
};

export const reducers = {

    workflowReducer:
        (state = initial, action) => {

            switch (action.type) {
                case 'STOP':
                    return initial;
                case types.STEPS_LIST_LOAD:
                    return stepsListLoad(state);
                case types.STEPS_LIST_LOAD_SUCCESS:
                    return stepsListLoadSuccess(state, action);
                case types.STEPS_LIST_LOAD_FAILURE:
                    return stepsListLoadFailure(state, action);
                case types.STEP_LOAD:
                    return stepLoad(state, action);
                case types.STEP_RESULT:
                    return stepResult(state, action);
                case types.STEP_CREATE_FOLLOWUP:
                    return stepCreateFollowup(state, action);
                case types.STEP_CREATE_SUCCESS:
                    return stepCreateSuccess(state, action);
                case types.STEP_CREATE_FAILURE:
                    return stepCreateFailure(state, action);
                case types.STEP_TYPE_DOCK:
                    return stepExtensionDock(state, action);
                case types.STEP_STATUS_UPDATE:
                    return stepStatusUpadte(state, action);
                case types.WORKFLOWS_LIST_LOAD:
                    return workflowsListLoad(state);
                case types.WORKFLOWS_LIST_LOAD_SUCCESS:
                    return workflowsListLoadSuccess(state, action);
                case types.WORKFLOWS_LIST_LOAD_FAILURE:
                    return workflowsListLoadFailure(state, action);
                case types.WORKFLOW_LOAD:
                    return workflowLoad(state, action);
                case types.WORKFLOW_LOAD_SUCCESS:
                    return workflowLoadSuccess(state, action);
                case types.WORKFLOW_LOAD_FAILURE:
                    return workflowLoadFailure(state, action);
                case types.WORKFLOW_CREATE:
                    return workflowCreate(state);
                case types.WORKFLOW_CREATE_SUCCESS:
                    return workflowCreateSuccess(state, action);
                case types.WORKFLOW_CREATE_FAILURE:
                    return workflowCreateFailure(state, action);
                case types.WORKFLOW_PIN:
                    return workflowPin(state, action);
                case types.WORKFLOW_UNPIN:
                    return workflowUnpin(state, action);
                case '@@router/LOCATION_CHANGE':
                    return workflowForgetNew(state);
                default:
                    return state;
            }
        }
};

export default {
    actions,
    epics,
    reducers
};

const inspectStepTree = (state) => {
    if (state.currentWorkflow === null || state.stepsList[state.currentWorkflow] === undefined)
        return [];
    let rel = {};
    Object.keys(state.stepsList[state.currentWorkflow]).forEach(sid => {
        if (rel[sid] === undefined)
            rel[sid] = [];
        if (rel[state.stepsList[state.currentWorkflow][sid].parent] === undefined)
            rel[state.stepsList[state.currentWorkflow][sid].parent] = [];
        rel[state.stepsList[state.currentWorkflow][sid].parent].push(sid);
    });
    let complex = [];
    const constructLevel = (id, level = 0) => {
        let branch = id === undefined ? null : id;
        let leafs = [];
        if (complex[level] === undefined)
            complex[level] = 0;
        if (rel[branch] !== undefined)
            rel[branch].forEach(element => {
                if (complex[level + 1] === undefined)
                    complex[level + 1] = 0;
                complex[level + 1]++;
                leafs = leafs.concat(constructLevel(element, level + 1));
            });
        if (branch !== null) {
            let struct = {
                level,
                padding: complex[level],
                _id: branch
            };
            let shifts = 1;
            struct.padding = '';
            while (shifts <= complex[level]) {
                if (shifts === complex[level])
                    struct.padding += '°';
                else
                    struct.padding += '|';
                shifts++;
            }
            leafs.push(struct);
        }
        return leafs;
    };

    return constructLevel();
};

const stepsListLoad = (state) => {
    state.stepsListLoading = true;
    return state;
};

const stepsListLoadSuccess = (state, action) => {
    let maxDate = new Date(0);
    state.stepsListLoading = false;
    state.stepsList = {};
    action.data.forEach(step => {
        if (state.stepsList[step.workflow] === undefined)
            state.stepsList[step.workflow] = {};
        state.stepsList[step.workflow][step._id] = step;
        if (state.currentStep === null || new Date(step.create) > maxDate) {
            state.currentStep = step._id;
            state.currentStepStatus = null;
            state.currentOutputs = state.stepTypes[step.extension].outputs;
            maxDate = new Date(step.create);
        }
    });
    state.stepsTree = inspectStepTree(state);
    state.stepsLastLoaded = new Date();
    return state;
};

const stepsListLoadFailure = (state, action) => {
    state.stepsListLoading = false;
    state.error = action.data.error;
    return state;
};

const stepLoad = (state, action) => {
    state.newStep = null;
    state.currentStep = action.step;
    state.currentStepStatus = null;
    state.followingStepType = null;
    state.followingStepInput = null;
    if (state.stepsList[state.currentWorkflow][action.step]) {
        state.currentOutputs = state.stepTypes[state.stepsList[state.currentWorkflow][action.step].extension].outputs;
    }
    return state;
};

const stepResult = (state, action) => {
    state.followingStepInput = action.result;
    return state;
};

const stepCreateFollowup = (state, action) => {
    state.followingStepType = action.eid;
    state.followingStepInput = null;
    return state;
};

const stepCreateSuccess = (state, action) => {
    if (state.stepsList[action.data.workflow] === undefined)
        state.stepsList[action.data.workflow] = {};
    state.followingStepType = null;
    state.followingStepInput = null;
    state.stepsList[action.data.workflow][action.data._id] = action.data;
    state.stepsTree = inspectStepTree(state);
    state.currentStep = action.data._id;
    state.newStep = action.data._id;
    state.currentOutputs = state.stepTypes[action.data.extension].outputs;
    return state;
};

const stepCreateFailure = (state, action) => {
    state.error = action.data.error;
    return state;
};

const workflowsListLoad = (state) => {
    state.workflowsListLoading = true;
    return state;
};

const workflowsListLoadSuccess = (state, action) => {
    state.workflowsListLoading = false;
    state.workflowsList = {};
    action.data.forEach(workflow => {
        state.workflowsList[workflow._id] = workflow;
    });
    state.workflowsLastLoaded = new Date();
    return state;
};

const workflowsListLoadFailure = (state, action) => {
    state.workflowsListLoading = false;
    state.error = action.data.error;
    return state;
};

const workflowLoad = (state) => {
    state.workflowLoading = true;
    return state;
};

const workflowLoadSuccess = (state, action) => {
    state.workflowLoading = false;
    state.workflowsList[action.workflow._id] = action.workflow;
    state.currentWorkflow = action.workflow._id;
    state.stepsList = {};
    state.stepsListLoading = false;
    state.stepsLastLoaded = new Date(0);
    state.currentStep = null;
    state.currentStepStatus = null;
    state.currentOutputs = [null];
    return state;
};

const workflowLoadFailure = (state, action) => {
    state.workflowLoading = false;
    state.error = action.data.error;
    return state;
};

const workflowCreate = (state) => {
    state.workflowLoading = true;
    return state;
};

const workflowCreateSuccess = (state, action) => {
    state.workflowLoading = false;
    state.workflowsList[action.workflow._id] = action.workflow;
    state.newWorkflow = action.workflow._id;
    state.newStep = null;
    state.stepsList = {};
    state.stepsListLoading = false;
    state.stepsLastLoaded = new Date(0);
    state.currentStep = null;
    state.currentStepStatus = null;
    state.currentOutputs = [null];
    return state;
};

const workflowCreateFailure = (state, action) => {
    state.workflowLoading = false;
    state.error = action.data.error;
    return state;
};

const workflowPin = (state, action) => {
    state.workflowPins[action.workflow] = true;
    state.currentWorkflow = action.workflow;
    return state;
};

const workflowUnpin = (state, action) => {
    state.workflowPins[action.workflow] = false;
    return state;
};

const workflowForgetNew = (state) => {
    state.newWorkflow = null;
    state.newStep = null;
    return state;
};

const stepExtensionDock = (state, action) => {
    const { profile } = action;
    if (typeof profile.name !== 'string' ||
        typeof profile.identifier !== 'string' ||
        profile.identifier.length <= 0 ||
        Array.isArray(profile.inputs) !== true ||
        Array.isArray(profile.outputs) !== true)
        return state;
    state.stepTypes[`${action.__origin__}/${profile.identifier}`] = profile;
    return state;
};

const stepStatusUpadte = (state, action) => {
    state.stepsStatuses[action.status.step] = action.status;
    if (state.currentStep === action.status.step)
        state.currentStepStatus = action.status.name;
    return state;
};