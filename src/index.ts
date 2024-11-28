import 'reflect-metadata'

// 参数装饰器
// 类装饰器
// 方法装饰器
// 属性装饰器
// 访问符装饰器
function methodDecorator() {
    return (target: any,propertyKey:string,descriptor:PropertyDescriptor) => {
        target.__proto__.say=()=>console.log('saying')
        console.log(target.__proto__)
    }
}
const formatMetadataKey ='key'
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
class Greeter {
    @format("Hello, %s")
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        console.log(formatString)
        return formatString.replace("%s", this.greeting);
    }
}
// new Greeter('xx').greet()
function setMetaData(value:string) {
    return Reflect.metadata('role', value)
}
function getMetaData(key, target: any, propertyKey) {
    return Reflect.getMetadata(key,target,propertyKey)
}
class A{
    @setMetaData('admin')
    name: string;
    constructor(message: string) {
        this.name = message;
    }
    @setMetaData('admin')
    say() {
        console.log(getMetaData('role',this,'say'))
    }
}
// new A('xx').say()
// printLine('hello world')

function required() {
    return (target: any, propertyKey: string, paramIndex:number) => {
        const exsistingRequiredParamIndex = Reflect.getMetadata('required', target, propertyKey) || []
        exsistingRequiredParamIndex.push(paramIndex)
        Reflect.defineMetadata('required',exsistingRequiredParamIndex,target,propertyKey)
    }
}
function validate(target:any,propertyKey:string,descriptor:any) {
    const origin: Function = descriptor.value!;
    const requiredIndexs: number[] = Reflect.getMetadata('required', target, propertyKey)
    descriptor.value = function () {
        for (var requiredIndex of requiredIndexs) {
            if (requiredIndex >= arguments.length || !arguments[requiredIndex]) {
                throw new Error('缺少参数')
            }
        }
        return origin.call(target, ...arguments)
    }
}

class B{
    @validate
    say(@required() name: string, @required() age:number) {
        console.log(Reflect.getMetadata('required',this,'say'))
    }
}
// new B().say('zs',1)


class C{
    protected name: string;
    constructor(name) {
        this.name = name;
    }
    speak(){}
}
class C_child extends C{
    override speak() {
        
    }
}

