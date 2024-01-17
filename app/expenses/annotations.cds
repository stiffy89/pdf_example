using purchasesservice as service from '../../srv/purchases-service';
annotate purchasesservice.Expenses with @odata.draft.enabled;

annotate service.Expenses with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Description',
            Value : description,
        }
    ]
);

annotate service.uploadAttachment with @(Common.SideEffects:{
    TargetProperties:['/pdf_attach']
});

/* annotate service.Expenses actions {
    uploadAttachment @(
        Common.SideEffects.TargetProperties : ['/pdf_attach']
    )
}  */

annotate service.Expenses with @(
    UI.HeaderInfo : {
        TypeName : 'Expense',
        TypeNamePlural : 'Expenses',
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : description,
        },
    }
);
annotate service.Expenses with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Information',
            ID : 'GeneralInformation',
            Target : '@UI.FieldGroup#GeneralInformation',
        },
    ],
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : name,
                Label : 'Name',
            },{
                $Type : 'UI.DataField',
                Value : description,
                Label : 'Description',
            },],
    }
);
