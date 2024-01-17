const cds = require('@sap/cds');

/* module.exports = cds.service.impl(async function() { 

    const {Expenses} = this.entities;

    this.before('CREATE', 'Expenses', async req=>{
        
    });

    this.before('NEW', Expenses, async req => {
        const lastExpenseID = await SELECT.one `max(id)` .from (Expenses);
        req.data.id = lastExpenseID;
    })
   
    this.on('uploadAttachment', req=>{
        console.log(req);
    });

}) */

class purchasesservice extends cds.ApplicationService {
    init () {
        const {Expenses} = this.entities;

        //pre populate
        this.before('CREATE', Expenses, async req=>{
            const maxId = await SELECT.one`max(id)`.from(Expenses);
            req.data.id = maxId.max + 1;
        })

        /* this.on('PUT', Expenses, async req=> {
            console.log(req);
        }) */

        this.before('UPDATE', Expenses, async req => {
            console.log(req.data)
            /* let pdf_attach = await SELECT `(pdf_attach)` .from(Expenses) . where({id:0});
            req.data.pdf_attach = pdf_attach[0].pdf_attach;
            console.log(req.data) */
        });

        

        this.on('uploadAttachment', async req=>{
           /*  const obj = await SELECT.from(Expenses).where({ id: 1 });
            const success = await UPDATE(Expenses).where({uuid:obj[0].uuid}).with({name:'hello'})
            console.log(obj);
            console.log(success); */
            const draftCopy = await SELECT.from(Expenses.drafts).where({uuid:req.data.content.data.uuid});
            const success = await UPDATE(Expenses.drafts).where({uuid:req.data.content.data.uuid}).with({pdf_attach:req.data.content.base64});
            console.log(success);
        });

        return super.init();
    }
}

module.exports = {purchasesservice}