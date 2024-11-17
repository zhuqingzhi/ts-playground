// 获取函数参数类型
// infer 可以推断，某个参数或者某个元素变量，或者其对应的变量类型
type GetParamType<Func extends Function> = Func extends (...args: infer Args) => any ? Args : never;
type func = (a: string, b: string) => void
type GetParamTypeResult = GetParamType<func>

// 获取返回值类型
type GetReturnType<Func extends Function> = Func extends (...args: unknown[]) => infer ReturnType ? ReturnType : never
type GetReturnTypeResult = GetReturnType<func>

// 获取this类型
type GetThisType<T> = T extends (this: infer ThisType, ...args: any[]) => any ? ThisType : never;

class Person {
    constructor(private readonly name: string) {

    }
    say() {
        console.log('I am' + this.name)
    }
}
const person = new Person('tom')
person.say.call({ name: 'jerry' })
type GetThisTypeResult = GetThisType<typeof person>

interface Person { }
interface PersonConstructor {
    new(name: string): Person
}

type GetInstanceType<constructor extends new (...args: any[]) => any> = constructor extends new (...args: any[]) => infer constructType ? constructType : never;

type GetInstanceTypeRes = GetInstanceType<PersonConstructor>


//索引类型

let school = {
    name: 'aabb',
    addr: 'xxx',
    ref: 'xxx'
}
type schType = typeof school

type SchoolType = keyof typeof school//为什么keyof typeof school可以获得其所有key组成的联合类型

type GetRefProp<Props> = 'ref' extends keyof Props ?
    Props extends { ref?: infer PropType | undefined } ? PropType : never
    : never

const obj={}

type GetRefPropRes=GetRefProp<typeof obj>

type Func=(name:string)=>void;

type GetFuncParamType<func extends Function>=func extends (name:infer NameType)=>void ? NameType:never;

type tempType=GetFuncParamType<Func>