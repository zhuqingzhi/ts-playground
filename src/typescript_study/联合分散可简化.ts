type Union='a'|'b'|'c'
type UnionRes=`${Union}~~`
type UpperCase<Str extends string>=Str extends `${infer first}${infer rest}`?`${UpperCase<first>}${rest}`:never;

type union=['aa','bb'][number]

// 条件类型如果左边是联合类型，那么会把每个元素单独传入做计算，而右边不会
type BEM<Block extends string,Ele extends string[],Modifier extends string[]>=`${Block}_${Ele[number]}_${Modifier[number]}`
type BEMRes=BEM<'list',['head','body'],['item']>


type IsUnion<A,B=A>=A extends A?
                            [B] extends [A]?false:true
                    :never
type IsUnionRes=IsUnion<'a'|'b'>

type tt='A'|'a'|1
type ttres=tt extends number ? true:false

type tt2=Exclude<tt,'a'>

type Combination<A extends string,B extends string>=A|B|`${A}${B}`|`${B}${A}`
type CombinationRes=Combination<'a','b'>

// 递归是缩小规模，从小到大；哪个变量需要缩小规模呢？缩小规模重复逻辑，到了极小规模的时候，手动设置
type AllCombinations<A extends string,B extends string=A >=A extends A ? Combination<A,AllCombinations<Exclude<B,A>>>:never

type AllCombinationsRes=AllCombinations<'a'|'b'>