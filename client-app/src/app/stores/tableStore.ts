//install mobx -- npm install mobx-react-lite

import {makeAutoObservable,runInAction } from "mobx"
import agent from "../api/agent";
import { Table } from "../models/table";
import {v4 as uuid} from 'uuid';
export default class TableStore {
    tables: Table[] = [];
    selectedTable: Table | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    loadTables = async () => {
        this.setLoadingInitial(true);
        try {
            const tables = await agent.Tables.list();//getting our activities and passing it out to a list

            tables.forEach(table => {
                table.date = table.date.split('T')[0];//updating our state
                this.tables.push(table);
            })
            this.setLoadingInitial(false);
            //setting the loading initial observable to false


        } catch (error) {
            console.log(error);

            this.loadingInitial = false;
            this.setLoadingInitial(false);


        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    selectTable = (id : string) => {
        this.selectedTable =this.tables.find( a => a.id === id);
    }
    cancelSelectedTable = () => {
        this.selectedTable = undefined;
    }
    openForm = ( id? : string) => {
        id ? this.selectTable(id) : this.cancelSelectedTable();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
    createTable = async(table : Table) => {
        this.loading = true;
        table.id = uuid();
        try {
            await agent.Tables.create(table);
            runInAction(() => {
                this.tables.push(table);
                this.selectedTable = table;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(()=> {
                this.loading = false;
            })
        }
    }
    updateTable = async(table : Table)=> {
        this.loading = true;
        try {
            await agent.Tables.update(table);
            runInAction(() => {
                this.tables =[...this.tables.filter(a => a.id !== table.id), table];
                this.selectedTable = table;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}