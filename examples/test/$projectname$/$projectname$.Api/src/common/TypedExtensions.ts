export interface Constructable<TType> {
    new (...args: any[]): TType;
}

export interface ObservableArray<T> extends kendo.Observable {
    length: number;
    [index: number]: T;

    constructor(array: T[]);
    init(array: T[]): void;
    empty(): void;
    every(callback: (item: T, index: number, source: ObservableArray<T>) => boolean): boolean;
    filter(callback: (item: T, index: number, source: ObservableArray<T>) => boolean): any[];
    find(callback: (item: T, index: number, source: ObservableArray<T>) => boolean): any;
    forEach(callback: (item: T, index: number, source: ObservableArray<T>) => void): void;
    indexOf(item: T): number;
    join(separator: string): string;
    map(callback: (item: T, index: number, source: ObservableArray<T>) => T): T[];
    parent(): kendo.data.ObservableObject;
    pop(): T;
    push(...items: T[]): number;
    remove(item: T): void;
    shift(): T;
    slice(begin: number, end?: number): T[];
    some(callback: (item: T, index: number, source: ObservableArray<T>) => boolean): boolean;
    splice(start: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    toJSON(): any[];
    unshift(...items: T[]): number;
    wrap(object: Object, parent: Object): any;
    wrapAll(source: Object, target: Object): any;
}

export class DataSource<T extends kendo.data.Model> extends kendo.data.DataSource {

    constructor(options: kendo.data.DataSourceOptions, model?: typeof kendo.data.Model) {

        if (!options.schema)
            options.schema = {};

        if (!options.schema.model && model)
            options.schema.model = model;

        super(options);

    }

    public dataT(): ObservableArray<T> {
        return <ObservableArray<T>>super.data();
    }

    public addT(item: T): T {
        return <T>(<any>super.add(item));
    }

    public atT(index: number): T {
        return <T>(<any>super.at(index));
    }

    public getT(id: number | string): T {
        return <T>(<any>super.get(id));
    }

    public getByUidT(uid: string): T {
        return <T>(<any>super.getByUid(uid));
    }

    public indexOfT(item: T): number {
        return super.indexOf(<any>item);
    }

    public insertT(index: number, item: T): T {
        return <T>(<any>super.insert(index, item));
    }

    public removeT(item: T) {
        super.remove(<any>item);
    }

    public viewT(): ObservableArray<T> {
        return <ObservableArray<T>>super.view();
    }
}
