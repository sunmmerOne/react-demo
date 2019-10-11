import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './index'

let DevToolsInstrument;

//开发工具检测
if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    DevToolsInstrument = window.devToolsExtension();
    try{
        window.Perf = Perf;
    } catch(e){}
}

export default (history)=>{
    //加强了history这个实例，以允许将history中接受到的变化反应到state中去
    const reduxRouterMiddleware = routerMiddleware(history);

    //thunkMiddleware做的事情就是判断 action 类型是否是函数，若是，则执行 action，若不是，则继续传递 action 到下个 middleware。
    const middleware = [reduxRouterMiddleware,thunkMiddleware];

    let finalCreateStore;
    //redux提供了applyMiddleware 这个 api 来加载 middleware
    //借助 compose ， applyMiddleware 可以用来和其他插件一起加强 createStore 函数.
    if(DevToolsInstrument){
        finalCreateStore = compose(applyMiddleware(...middleware),DevToolsInstrument)(createStore);
    }else{
        finalCreateStore = applyMiddleware(...middleware)(createStore);
    }

    // rxjs + redux-middleware
    // state:       11111111111122222222233333
    // interaction:
    // offset:      123453198632
    // output:      12345319863222222222233333
    //
    //
    // string -> html
    //
    // 200W html 100G neicun
    //
    // path -> html(QPS:60-200)
    // html -> redis -> 6000-10000
    // ssr -> top xxxxpx / common -> ssr
    // ssr csr
    // initialState -> csr

    //将router组合进reducer
    const reducer = combineReducers({
        root: reducers,
        routing: routerReducer,
    });

    // rootReducer = {}
    // store.replaceReducer({
    //     [key]: value,
    // });

    return finalCreateStore(reducer);
}
