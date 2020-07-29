import {
  Machine, State, Interpreter,
} from 'xstate';

import {
  TimerContext,
  TimerStates,
  TimerEvent,
} from './timerMachineDeclarations';
import * as actions from './timerMachineActions';

const timerMachine = Machine<TimerContext, TimerStates, TimerEvent>({
  id: 'timerMachine',
  initial: 'timerOff',
  context: {
    turnTime: 8,
    breakTime: 12,
    breakTurns: 6,
    activeUsers: ['Ville', 'Ida'],
    inactiveUsers: ['John', 'Frans'],
  },
  states: {
    timerOff: {
      on: {
        START: 'timerOn',
      },
    },
    timerOn: {
      on: {
        STOP: 'timerOff',
      },
      initial: 'running',
      states: {
        running: {
          on: {
            PAUSE: 'paused',
          },
        },
        paused: {
          on: {
            START: 'running',
          },
        },
      },
    },
  },
  on: {
    UPDATE_TURN_TIME: {
      actions: [actions.updateTurnTime],
    },
    UPDATE_BREAK_TIME: {
      actions: [actions.updateBreakTime],
    },
    UPDATE_BREAK_TURNS: {
      actions: [actions.updateBreakTurns],
    },
    UPDATE_ACTIVE_USERS: {
      actions: [actions.updateActiveUsers],
    },
    UPDATE_INACTIVE_USERS: {
      actions: [actions.updateInactiveUsers],
    },
  },
});

export default timerMachine;
