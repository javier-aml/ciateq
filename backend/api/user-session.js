const sql = require('mssql');
const crypto = require('crypto');
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
		if(data.action === 'VALIDATE'){
			const key = crypto.createDecipher('aes-128-cbc','Altamirano302');
			let token = key.update(data.session_token,'hex','utf8');
			token += key.final('utf8');
			token = token.split('&');
			const curp = token[0];
			const session = token[1];
			request.input('curp',curp);
			request.output('output_val');
			request.execute('spGetSession',(error,res) => {
				let response = res.output.output_val === 'INVALID' ? false:res.output.output_val;
                if(response){
                    const currDate = new Date();
                    const sessionDate = new Date(res.output.output_val);
                    response = sessionDate > currDate ? true:false;
                }
				context.res = {
					body:{response:response},
					headers:{'Content-Type':'application/json'}
				};
				context.done();
			});
		}else if(data.action === 'CREATE'){
			let session_token = new Date();
			session_token.setMinutes(session_token.getMinutes() + 3);
			session_token = session_token.toISOString().substr(0,16);
			const key = crypto.createCipher('aes-128-cbc','Altamirano302');
			let encryptedToken = key.update(`${data.curp}&${session_token}`,'utf8','hex');
			encryptedToken += key.final('hex');			
			request.input('curp',data.curp);
			request.input('employee_no',data.employee_no);
			request.input('session_token',session_token);
			request.output('output_val');
			request.execute('spSetSession',(error,res) => {
				let response = res.output.output_val === 'CREATED' ? encryptedToken:false;
				context.res = {
					body:{response:response},
					headers:{'Content-Type':'application/json'}
				};
				context.done();
			});	
		}
    });
}
