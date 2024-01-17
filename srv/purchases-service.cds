using purchases from '../db/schema';

service purchasesservice {
    action uploadAttachment(content: LargeBinary @Core.MediaType: 'application/pdf');
    entity Expenses as projection on purchases.Expenses;
}