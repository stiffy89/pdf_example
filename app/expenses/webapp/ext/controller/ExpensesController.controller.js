sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('ns.expenses.ext.controller.ExpensesController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			
			onInit: function () {
				
			},

			editFlow: {
			/*	onBeforeEdit:function(mParams){
					
				},
				onBeforeSave:function(mParameters) {
					 return new Promise(function(resolve, reject){
						let oDataObj = mParameters.context.getObject();
						let oUploadSet = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::CustomSubSection::Pdf_attach--uploadSet");
						let oNewFile = oUploadSet._newFile;
						if (!oNewFile){
							resolve();
						}
						

						const toBase64 = file => new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onload = () => resolve(reader.result);
							reader.onerror = reject;
						});

						async function convertToBase64(file){
							let sResult = await toBase64(file);
							oDataObj.pdf_attach = sResult.split(",").pop();
							console.log(oDataObj);
							resolve();
						}

						convertToBase64(oNewFile);
					})  
				},*/
				onBeforeSave: function (mParameters){
					let oModel = this.getView().getModel();

					return new Promise(function(saveResolve,saveReject){
						let oDataObj = mParameters.context.getObject();
						let oOperation = oModel.bindContext("/uploadAttachment(...)");
						let oNewFile = sap.ui.getCore().byId("ns.expenses::ExpensesObjectPage--fe::CustomSubSection::Pdf_attach--uploadSet")._newFile;
						
						const toBase64 = file => new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onload = () => resolve(reader.result);
							reader.onerror = reject;
						});

						async function convertToBase64(file){
							let sResult = await toBase64(file);
							let sBase64Str = sResult.split(",").pop();
							let oParamObj = {
								"data" : oDataObj,
								"base64" : sBase64Str
							}
							oOperation.setParameter('content', oParamObj);
							oOperation.execute().then(function(){
								saveResolve();
								
							})
						}

						convertToBase64(oNewFile);
					});
				},

				/* onAfterSave: function (mParameters) {
					let oDataObj = mParameters.context.getObject();
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
					oUploadFile.upload();
				}, */

	

			/*	onBeforeCreate:function(mParameters){
					
					return new Promise(function(resolve, reject){
						console.log(mParameters.contextPath);
						console.log(mParameters.createParameters);
						resolve();
					})
				},
				onAfterCreate:function(mParameters){
					return new Promise(function(resolve, reject){
						console.log(mParameters.contextPath);
						console.log(mParameters.createParameters);
						resolve();
					})
				} */
			}
		}
	});
});
