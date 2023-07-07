import { createMachine, assign } from "xstate"


const LoginUser = async (context) => {
    const { username, password, login } = context;
    const response = await login({
        variables: {
            username, password
        }
    })
    console.log('response', response)
    return response
}

const loginMachine = createMachine({
    id: 'registration',
    initial: 'idle',
    context: {
        username: '',
        password: '',
        login: null
    },
    states: {
        idle: {
            on: {

                userNameChange: {
                    actions: assign({
                        username: (_, event) => event.value
                    }),

                },
                passwordChange: {
                    actions: assign({
                        password: (_, event) => event.value
                    }),


                },
                submit: 'submitting'
            },
        },
        submitting: {
            invoke: {
                src: LoginUser,
                onDone: {
                    target: 'success',
                },
                onError: {
                    target: 'failure',
                    actions: assign((context, event) => {
                        return {
                            ...context,
                            error: event.message

                        }
                    }),
                },
            },
        },
        success: {
            entry: 'clearForm',
            on: {
                reset_form: 'idle'
            }
        },
        failure: {

            on: {
                userNameChange: {
                    actions: assign({
                        username: (_, event) => event.value
                    }),

                },
                passwordChange: {
                    actions: assign({
                        password: (_, event) => event.value
                    }),


                },
                submit: 'submitting'
            },
        },
        actions: {

            clearForm: assign({
                title: '',
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
                password: ''
            })
        },


    },
});

export default loginMachine;