//install mobx -- npm install mobx-react-lite

import { observable, makeObservable } from "mobx"

export default class TableStore {
    title = 'Hello from mobX!'

    constructor(){
        makeObservable(this, {
            title: observable
        })
    }
}