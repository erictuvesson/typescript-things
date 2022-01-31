export enum Getters {
    GETTER_1 = 'GETTER_1',
    GETTER_2 = 'GETTER_2',
    GETTER_3 = 'GETTER_3',
}

type GetterValues<TState = unknown> = {
    [Getters.GETTER_1](state: TState): number,
    [Getters.GETTER_2](state: TState): boolean,
    [Getters.GETTER_3](state: TState): string | null,
}

type ExtractFunctionWithReturnType<T extends { [key: string]: any }> = {
    [P in keyof T]: ReturnType<T[P]>;
}

interface IGetter<TState> {
    // this is more for typings, just visualizing it here
    getters: ExtractFunctionWithReturnType<GetterValues<TState>>
}

class State {}

class Getter implements IGetter<State> {
    getters: ExtractFunctionWithReturnType<GetterValues<State>>
}

const myGetter = new Getter()

const myNumber1: number = myGetter.getters.GETTER_1
const myNumber2: number = myGetter.getters[Getters.GETTER_1]
