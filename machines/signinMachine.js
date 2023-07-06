import { loginMutation } from "@/mutations/LoginMutation";
import { useMutation } from "@apollo/client";
import { createMachine } from "xstate";

const signinMachine = createMachine({
    id: 'registration',
    initial: 'idle',
    context: {
        title: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        password: ''
    },
    states: {
        idle: {
            on: {
                'update_input': {
                    actions: ['updateInput']
                },
                'submit_form': 'submitting'
            }
        },
        submitting: {
            invoke: {
                src: 'submitForm',
                onDone: {
                    target: 'success',
                },
                onError: {
                    target: 'failure',
                    actions: ['setError'],
                },
            },
        },
        success: {
            entry: 'clearForm',
            on: {
                'reset_form': 'idle'
            }
        },
        failure: {
            on: {
                update_input: {
                    target: 'idle',
                    actions: ['updateInput']
                },
                'submit_form': 'submitting'

            }
        }
    },
    actions: {
        updateInput: assign((context, event) => {
            const { name, value } = event.payload;
            return {
                ...context,
                [name]: value,
            }
        }),
        setError: assign((context, event) => {
            return {
                ...context,
                error: event.message

            }
        }),
        clearForm: assign({
            title: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            password: ''
        })
    },
    services: {
        submit_form: async (context) => {
            const { title, firstName, lastName, email, password } = context;
            const input = {
                title,
                firstName,
                lastName,
                emailAddress: email,
                password,
            }
            const [register] = useMutation(loginMutation)
            const response = await register({
                variables: { input }
            })
            return response.data.register
        }
    }
});

export default signinMachine;