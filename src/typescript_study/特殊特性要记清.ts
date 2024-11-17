type IsAny<T>='tt' extends ('dd'&T)?true:false;
type IsAnyRes=IsAny<any>

type IsNever<T>=T extends never ? true:false
type IsNeverRes=IsNever<never>

type IsNeverType<T>=[T] extends [never]?true:false;
type IsNeverTypeRes=IsNeverType<never>

type TestAnyType<T>=T extends number ?1:2;
type TestAnyTypeRes=TestAnyType<any>

type len=['1','1']['length']

type len2=number[]['length']

type UnionToIntersection<U>=(U extends U ?(x:U)=>unknown:never) extends (x:infer R)=>unknown?R:never;
type UnionToIntersectionRes=UnionToIntersection<{a:1}|{b:2}>

type NotEqual<A,B>=(<T>()=>T extends A?1:2) extends (<T>()=>T extends B?1:2)?false:true;

type NotEqualRes=NotEqual<'a'|'b','a'|'b'>

type typ1='a'|'b'
type type2='a'|1
type ss<T>=()=>T extends typ1?1:2;
type ss2<T>=()=>T extends type2?1:2
type rr=ss<typ1> extends ss2<type2>?true:false

type type3=<T>()=>T;

type objs=Pick<{name:string,age?:number},'age'>
type objsRes={} extends objs?true:false


//任何复杂的逻辑方法，一定有展示其底层原理的例子，也就是说可以缩小规模

type GetOptional<T extends Record<string,any>>={
    [
        Key in keyof T as {} extends Pick<T,Key>?Key:never
    ]:T[Key]
}

type GetOptionalRes=GetOptional<{
    name?:string,
    age:number
}>
// 可选就是意味着这个索引值是不是可能为undefined

//索引类型可能有索引，也可能有可索引签名
type Dong={
    [key:string]:any//表示该类型可以添加任意个类型为string的索引
}
const dong:Dong={
    name:'',
    age:''
}