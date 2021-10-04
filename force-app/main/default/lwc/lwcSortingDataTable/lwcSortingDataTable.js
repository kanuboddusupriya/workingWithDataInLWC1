import { LightningElement , wire, track} from 'lwc';
import sortContactList from '@salesforce/apex/lwcSortingDataTableCtrl.sortContactList';
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        sortable: "true"
    }, {
        label: 'Email',
        fieldName: 'Email',
        type: 'email',
        sortable: "true"
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: "true"
    }, {
        label: 'Title',
        fieldName: 'Title',
        type: 'Picklist',
        sortable: "true"
    }, 
    {
        label: 'Account Name',
        fieldName: 'AccountName',
        type: 'text',
        sortable: "true"
    },
    {
        label: 'Owner Name',
        fieldName: 'OwnerName',
        type: 'text',
        sortable: "true"
    }
];
export default class lwcSortingDataTable extends LightningElement {
    @track data=[];
    @track columns = columns;
    @track sortBy;
    @track sortDirection;
    
    @wire(sortContactList)
    opp({error, data}) {
        if(data) {
            let currentData = [];
            data.forEach((row) => {
                /* 
                * Creating the an empty object
                * To reslove "TypeError: 'set' on proxy: trap returned falsish for property"
               */
                let rowData = {};
                rowData.Name = row.Name;
                rowData.Email = row.Email;
                rowData.Title = row.Title;
                rowData.Phone = row.Phone;
                // Account related data
                if (row.Account) {
                    rowData.AccountName = row.Account.Name;
                    //rowData.AccountOwner = row.Account.Owner.Name;
                }
                // Owner releated data
                if (row.Owner) {
                    rowData.OwnerName = row.Owner.Name;
              }
                currentData.push(rowData);
            });
            this.data = currentData;
        }
        else if(error) {
            window.console.log(error);
        }
    }

    //contacts(result) {
        //if (result.data) {
           // this.data = result.data;
            //this.error = undefined;
 
       // } else if (result.error) {
        //    this.error = result.error;
            //this.data = undefined;
        //}
    //}
    
 
    sortContactData(fieldname, direction) {
        
        let parseData = JSON.parse(JSON.stringify(this.data));
       
        let keyValue = (a) => {
            return a[fieldname];
        };
 
       let isReverse = direction === 'asc' ? 1: -1;
 
           parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
           
            return isReverse * ((x > y) - (y > x));
        });
        
        this.data = parseData;
 
    }
 
}