const sql = require('mssql');
module.exports = (context) => {
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
		const data = context.req.body;
		request.input('curp',data.curp);
		request.input('employee_no',data.employee_no);
		request.input('region',data.region);
		request.input('full_name',data.full_name);
        request.output('output_val');
        request.execute('spSetEmployee',(error,res) => {
            context.res = {
                body:{response:res.output},
                headers:{'Content-Type':'application/json'}
            };
            context.done();
        });
    });
}
