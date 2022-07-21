const modules = import.meta.globEager('../components/*.vue')

export default {
    install(app: { component: (arg0: any, arg1: any) => void; }) {
        Object.keys(modules).forEach(componentPath => {

            // 获取遍历的当前组件实例对象
            let curComponent = modules[componentPath]?.default 
            if(curComponent.name == undefined) return
            app.component(curComponent.name, curComponent);
        })
    }
   
}


