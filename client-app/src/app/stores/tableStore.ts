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
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get tablesByDate() {
        return Array.from(this.tableRegistry.values()).sort((a,b) =>
         Date.parse(a.date) - Date.parse(b.date))
    }

    loadTables = async () => {
        this.setLoadingInitial(true);
        try {
            const tables = await agent.Tables.list();//getting our tables and passing it out to a list

            tables.forEach(table => {
                this.setTable(table);
            })
            this.setLoadingInitial(false);
            //setting the loading initial observable to false


        } catch (error) {
            console.log(error);

            this.loadingInitial = false;
            this.setLoadingInitial(false);


        }
    }
    private setTable = (table : Table) => {
        table.date = table.date.split('T')[0];//updating our state
                this.tableRegistry.set(table.id, table);
    }
    //load single table
    loadTable = async (id : string) => {
        let table = this.getTable(id);
        if(table) {this.selectedTable = table;
            this.selectedTable = table;
            return table;
            }
        else {
            this.setLoadingInitial(true);
            try {
                table = await agent.Tables.details(id);
                this.setTable(table);
                runInAction(() => this.selectedTable = table);
                this.setLoadingInitial(false);
                return table;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getTable = (id : string) => {
        return this.tableRegistry.get(id);
    }
        
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
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