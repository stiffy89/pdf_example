using {sap} from '@sap/cds/common';

namespace purchases;

define entity Expenses {
    key uuid : UUID;
        id : Integer;
        name : String (20);
        description: String (100);
        pdf_attach : LargeBinary @Core.MediaType: 'application/pdf'
};

