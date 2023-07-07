import { createMachine, assign } from "xstate"


const RegisterUser = async (context) => {
    const { title, firstName, lastName, emailAddress, phoneNumber, password, register } = context;
    const response = await register({
        variables: {
            title, firstName, lastName, email: emailAddress, phoneNumber, password
        }
    })
    console.log('response', response)
    return response
}

const signinMachine = createMachine({
    id: 'registration',
    initial: 'idle',
    context: {
        title: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        password: '',
        register: null
    },
    states: {
        idle: {
            on: {
                titleChange: {
                    actions: assign({
                        title: (_, event) => event.value
                    }),
                },
                firstNameChange: {
                    actions: assign({
                        firstName: (_, event) => event.value
                    }),
                },
                lastNameChange: {
                    actions: assign({
                        lastName: (_, event) => event.value
                    }),
                },
                emailChange: {
                    actions: assign({
                        emailAddress: (_, event) => event.value
                    }),

                },
                phoneNumberChange: {
                    actions: assign({
                        phoneNumber: (_, event) => event.value
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
                src: RegisterUser,
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
                titleChange: {
                    actions: assign({
                        title: (_, event) => event.value
                    }),
                },
                firstNameChange: {
                    actions: assign({
                        firstName: (_, event) => event.value
                    }),
                },
                lastNameChange: {
                    actions: assign({
                        lastName: (_, event) => event.value
                    }),
                },
                emailChange: {
                    actions: assign({
                        emailAddress: (_, event) => event.value
                    }),

                },
                phoneNumberChange: {
                    actions: assign({
                        phoneNumber: (_, event) => event.value
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

export default signinMachine;