//install mobx -- npm install mobx-react-lite

import {makeAutoObservable,runInAction } from "mobx"
import agent from "../api/agent";
import { Table } from "../models/table";
import {v4 as uuid} from 'uuid';
export default class TableStore {
    tableRegistry = new Map<string, Table>();
    selectedTable: Table | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get tablesByDate() {
        return Array.from(this.tableRegistry.values()).sort((a,b) =>
         Date.parse(a.date) - Date.parse(b.date))
    }

    loadTables = async () => {
        try {
            const tables = await agent.Tables.list();//getting our activities and passing it out to a list

            tables.forEach(table => {
                table.date = table.date.split('T')[0];//updating our state
                this.tableRegistry.set(table.id, table);
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
        this.selectedTable =this.tableRegistry.get(id);
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
                this.tableRegistry.set(table.id, table)
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
                this.tableRegistry.set(table.id, table)
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
    deleteTable = async(id:string) => {
        this.loading = true;
        try {
            await agent.Tables.delete(id);
            runInAction(() => {
                this.tableRegistry.delete(id)
                if(this.selectedTable?.id === id) this.cancelSelectedTable();
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