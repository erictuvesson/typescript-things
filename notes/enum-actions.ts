export enum Actions {
    ACTION_1 = 'ACTION_1',
    ACTION_2 = 'ACTION_2',
    ACTION_3 = 'ACTION_3',
}

type ActionsValues<TState = unknown> = {
    [Actions.ACTION_1]: (state: TState, payload: number) => number,
    [Actions.ACTION_2]: (state: TState, payload: boolean) => boolean,
    [Actions.ACTION_3]: (state: TState, payload: string) => string,
}

class State {}

const actions1: ActionsValues<State> = {
    [Actions.ACTION_1](state: State, payload: number): number {
        return payload
    },
    [Actions.ACTION_2](state: State, payload: boolean): boolean {
        return payload
    },
    [Actions.ACTION_3](state: State, payload: string): string {
        return payload
    },
}

const myState = new State()

// Calling them direct with type checking
actions1.ACTION_1(myState, 1)
actions1.ACTION_2(myState, true)
actions1.ACTION_3(myState, 'true')



interface IDispatcher<TState> {
    execute<TKey extends Actions>(
        state: TState,
        key: TKey,
        payload: Parameters<ActionsValues[TKey]>[1]
    ): ReturnType<ActionsValues<TState>[TKey]>
}

class Dispatcher<TState> implements IDispatcher<TState> {
    execute<TKey extends Actions>(
        state: TState,
        key: TKey,
        payload: Parameters<ActionsValues<TState>[TKey]>[1]
    ): ReturnType<ActionsValues<TState>[TKey]> {
        // @ts-expect-error Not sure how to solve this
        return actions1[key](state, payload)
    }
}

const myDispatcher = new Dispatcher()

// Calling them with type checking
const myNumber: number = myDispatcher.execute(myState, Actions.ACTION_1, 1)
const myBoolean: boolean = myDispatcher.execute(myState, Actions.ACTION_2, true)
const myString: string = myDispatcher.execute(myState, Actions.ACTION_3, 'true')
