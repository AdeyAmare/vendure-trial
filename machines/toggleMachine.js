
import { createMachine } from "xstate";

const toggleMachine = createMachine({
    id: 'password',
    initial: 'hidden',
    states: {
        hidden: {
            on: { TOGGLE: 'visible' }
        },
        visible: {
            on: { TOGGLE: 'hidden' }
        }
    }
});

export default toggleMachine;