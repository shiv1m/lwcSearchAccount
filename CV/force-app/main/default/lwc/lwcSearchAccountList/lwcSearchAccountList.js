import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/lwcApexController.searchAccountNameMethod';

export default class LwcSearchAccountList extends LightningElement {
    @track accounts;
    @track error;
    @track tableData;
    @track tableData1;
    retrieveAccounts() {
        this.tableData = [];
        this.tableData1 = [];
        //getAccounts() method - get the list of accounts from the imported
        // Apex class for the given search key
        getAccounts({ accountName: this.searchKey })
            .then(result => {
                this.accounts = result;
                //Check for the missing Contacts assosicated to the Account missing 
                for (let i of this.accounts) {
                    if (!(i.hasOwnProperty("Contacts"))) {
                        let x;
                        x = { Contacts: { 'length': 0 } };
                        i = Object.assign(x, i);
                        this.tableData1.push(i);
                    } else {
                        this.tableData1.push(i);
                    }
                }
                //Check for the missing Opportunities assosicated to the Account 
                for (let i of this.tableData1) {
                    if (!i.hasOwnProperty("Opportunities")) {
                        let x;
                        x = { Opportunities: { 'length': 0 } };
                        i = Object.assign(x, i);
                        this.tableData.push(i);
                    } else {
                        this.tableData.push(i);
                    }
                }
            })
            .catch(error => {
                this.error = error;
            });
    }
    clear() {
        this.accounts = [];
        this.tableData = [];
        this.tableData1 = [];
    }
    searchAccountAction(event) {
        this.searchKey = event.target.value;
    }
}