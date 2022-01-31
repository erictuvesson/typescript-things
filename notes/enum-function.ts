enum EventTypes {
    Default = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
}

type EventTypesArguments = {
    [EventTypes.Default]: null,
    [EventTypes.Info]: {
        id: string;
    },
    [EventTypes.Warning]: null,
    [EventTypes.Error]: null,
};

const test = {
    subscribe<K extends number>(
        event: K & EventTypes,
        ...args: EventTypesArguments[K] extends null ? [undefined?] : [EventTypesArguments[K]]
    ): void {

    }
};

test.subscribe(EventTypes.Default)
test.subscribe(EventTypes.Info, { id: '1' })
test.subscribe(EventTypes.Warning)
test.subscribe(EventTypes.Error)
