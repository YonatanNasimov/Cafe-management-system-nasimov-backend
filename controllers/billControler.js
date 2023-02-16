const db = require("../db/connectDB")
const ejs = require('ejs')
const pdf = require('html-pdf')
// npm? let?
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')


exports.billCtrl = {
    generateReport: (req, res) => {
        const generatedUuid = uuid.v1();
        const orderDetails = req.body;
        let productDetailsReport = JSON.parse(orderDetails.productDetails)

        const q = "INSERT INTO `cafemanger`.`bills` (`uuid`, `name`, `email`, `contectNumber`, `paymentMethod`, `total`, `productDetails`, `createdBy`) VALUES (?);";
        const values = [
            generatedUuid, orderDetails.name, orderDetails.email, orderDetails.contectNumber, orderDetails.paymentMethod, orderDetails.total, orderDetails.productDetails, orderDetails.createdBy,
        ];

        db.query(q, [values], (err, data) => {
            if (err) {
                return res.status(500).json(err)
            } else {
                ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
                    productDetails: productDetailsReport,
                    name: orderDetails.name,
                    email: orderDetails.email,
                    contectNumber: orderDetails.contectNumber,
                    paymentMethod: orderDetails.paymentMethod,
                    totalAmount: orderDetails.total
                }, (errEJS, result) => {
                    if (errEJS) {
                        console.log(errEJS)
                        return res.status(500).json(errEJS);
                    } else {
                        pdf.create(result).toFile('./generated_pdf/' + generatedUuid + '.pdf', (errPDF, pdfData) => {
                            if (errPDF) {
                                console.log(errPDF);
                                return res.status(500).json(errPDF);
                            } else {
                                return res.status(200).json({ uuid: generatedUuid });
                            }
                        })
                    }

                })
            }
        });
    },
    getPdf: (req, res) => {
        const orderDetails = req.body;
        const pathPdf = './generated_pdf/' + orderDetails.uuid + '.pdf';
        if (fs.existsSync(pathPdf)) {
            res.contentType("application/pdf");
            fs.createReadStream(pathPdf).pipe(res);
        } else {
            let productDetailsReport = JSON.parse(orderDetails.productDetails);
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contectNumber: orderDetails.contectNumber,
                paymentMethod: orderDetails.paymentMethod,
                totalAmount: orderDetails.total
            }, (errEJS, result) => {
                if (errEJS) {
                    console.log(errEJS)
                    return res.status(500).json(errEJS);
                } else {
                    pdf.create(result).toFile('./generated_pdf/' + orderDetails.uuid + '.pdf', (errPDF, pdfData) => {
                        if (errPDF) {
                            console.log(errPDF);
                            return res.status(500).json(errPDF);
                        } else {
                            res.contentType("application/pdf");
                            fs.createReadStream(pathPdf).pipe(res);
                        }
                    })
                }
            })
        }
    },
    getAllBills: (req, res) => {
        const q = "SELECT * FROM bills ORDER BY billId DESC;";
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    DeleteBillById: (req, res) => {
        const q = "DELETE FROM bills WHERE billId = ?;"
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows == 0){
                return res.status(404).json({msg:"Bill Id Not Found"});
            }
            return res.status(200).json({msg:"Bill Deleted Successfully"});
        })
    }
};
