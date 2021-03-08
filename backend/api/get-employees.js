const sql = require('mssql');
module.exports = (context,req) => {
    let results = null;
	const config = {
		server:'ciateq.database.windows.net',
		database:'CIATEQ',
		user:'javier_aml',
		password:'Altamirano302',
		port:1433,
		options:{
			encrypt: true
		}
	};
	sql.connect(config,error => {
        const request = new sql.Request();
        request.execute('spGetEmployees',(error,res) => {
            results = res.recordset;
            context.res = {
                body:{response:results},
                headers:{'Content-Type':'application/json'}
            };
            context.done();
        });
    });
}
