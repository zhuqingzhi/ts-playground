@mixin('ab')
class A{

}
function mixin(name:string):ClassDecorator {
    return (target:any) => {
        target.value='abc'
    }
}
