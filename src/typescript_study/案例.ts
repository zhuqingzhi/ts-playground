type ConstructorType<T extends abstract new (...args:any)=>any>=T extends abstract new (...args:infer P)=>any?P:never;
interface PersonConstructor{
    new( name:string):Person;
}
type ConstructorTypeRes=ConstructorType<PersonConstructor>

type InstanceTypes<T extends abstract new (...args:any)=>any>=T extends abstract new (...args:any)=>infer P?P:never;
type InstanceTypesRes=InstanceTypes<PersonConstructor>

type MyPartial<T>={
    [U in keyof T]?:T[U]
}
let objs={
    name:'tom'
}
type MyPartialRes=MyPartial<typeof objs>
let dd:MyPartialRes={
    name:"dd"
}

type Requireds<T>={
    [K in keyof T]-?:T[K]
}
type RequiredsRes=Requireds<MyPartialRes>

type MyReadonly<T>={
    readonly [U in keyof T]:T[U];
}

type MyPick<T,K extends keyof T>={
    [P in K]:T[P];
}

type MyRecord<K extends keyof T,T>={
    [P in K]:T[P];
}
type ee=keyof any;
type ff=keyof number;

type MyExclude<T,U>=T extends U?never:T;
type MyExcludeRes=MyExclude<'a'|'b'|'c','a'|'b'>

type MyExtract<T,U>=T extends U?T:never;
type MyExtractRes=MyExtract<'a'|'b'|'c','a'|'b'>

type MyOmit<T,K extends keyof any>=Pick<T,Exclude<keyof T,K>>

type MyAwaited<T>=T extends null|undefined
?T:T extends object&{then(onfulfilled:infer F):any}
    ?F extends ((value:infer V,...args:any)=>any)
        ?MyAwaited<V>
    :never
:T;
type MyAwaitedRes=MyAwaited<Promise<Promise<number>>>
let objss=Promise.resolve('')
type PromiseRes=typeof objss;