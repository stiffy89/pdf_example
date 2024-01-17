sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        visibilityFormatter: function (bVal) {
           
            return !bVal;
        },

        onFileChange: function (oEvent) {
            let oNewFile = oEvent.getParameters("files").files[0];
            let oUploadSet = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::CustomSubSection::Pdf_attach--uploadSet");
            oUploadSet._newFile = oNewFile;
        },

        onPress: function(oEvent) {
            
            let oUploadSet = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::CustomSubSection::Pdf_attach--uploadSet");
            let oNewFile = oUploadSet._newFile;
            let reader = new FileReader();
            
            reader.onload = function(oEvent){
                let oContent = oEvent.currentTarget.result;
                updateFile(oContent);
            }.bind(this);
            
            reader.readAsDataURL(oNewFile);

            function updateFile(content){
                let oBindingContext = oUploadSet.getBindingContext();
                oBindingContext.setProperty("/pdf_attach", content);
            }
        },

        onUpload : function () {
            /* let oDataObj = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::ObjectPage").getBindingContext().getObject();
            let sUUID = oDataObj.uuid;
            let sUrlStr = "/odata/v4/purchasesservice/Expenses(uuid=" + sUUID + ",IsActiveEntity=true)/pdf_attach";
            let oUploadFile = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::CustomSubSection::Pdf_attach--uploadSet");
            oUploadFile.setUploadUrl(sUrlStr);
            oUploadFile.setSendXHR(true);
            oUploadFile.setHttpRequestMethod(sap.ui.unified.FileUploaderHttpRequestMethod.Put);
            let oHeaderParam = new sap.ui.unified.FileUploaderParameter({
                name: "Content-Type",
                value: "application/pdf"
            });

            oUploadFile.addHeaderParameter(oHeaderParam);
            oUploadFile.upload(); */
            
            /* let oDataObj = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::ObjectPage").getBindingContext().getObject();
            let oNewFile = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::CustomSubSection::Pdf_attach--uploadSet")._newFile;
            let sUUID = oDataObj.uuid; */
          /*  let sUrlStr = "/odata/v4/purchasesservice/Expenses(uuid=" + sUUID + ",IsActiveEntity=true)/pdf_attach";
            
            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });

            async function convertToBase64(file){
                let sResult = await toBase64(file);
                let sBase64Str = sResult.split(",").pop();
                $.ajax({
                    url: sUrlStr,
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/pdf' },
                    datatype: 'json',
                    data: sBase64Str,
                    success: function() { console.log('hello') },
                    error: function(oError) {  }
                });
            }

            convertToBase64(oNewFile); */

             /* $.ajax({
                url: "/odata/v4/purchasesservice/Expenses",
                method: 'POST', 
                headers: { 'x-http-method': 'PUT' },
                datatype: 'json',
                data: {
                    uuid: sUUID,
                    name : 'hello'
                },
                success: function() { console.log('hello') },
                error: function(oError) { }
            });  */

            

            
        },
    };
});
