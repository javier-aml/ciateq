const userListComp = {
    emits:['log-out'],
    template:`
        <div id="listWrapper">
            <span class="label" v-if="!employeesArr.length">Cargando datos...</span>
            <span v-else>
                <span>
                    <h2>Lista de usuarios</h2>
                    <a @click.prevent="logOut" href="">Cerrar sesion</a>
                </span>
                <table>
                    <thead>
                    <tr>
                        <th>No. empleado</th>
                        <th>CURP</th>
                        <th>Region</th>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employeesArr">
                            <td>{{employee.employee_no}}</td>
                            <td>{{employee.curp}}</td>
                            <td>{{employee.region}}</td> 
                            <td>{{employee.full_name}}</td>
                            <td>
                                <a @click.prevent="deleteEmployee" href="">eliminar</a>
                            </td>                                                            
                        </tr>
                    </tbody>
                </table>
            </span>
        </div>
    `,
    data(){
        return{
            employeesArr:[]
        }
    },
    methods:{
        logOut(){
            localStorage.removeItem('ciateqSession');
            this.$emit('log-out');
        },
        async getEmployees(){
            try{
                let employeesData = await fetch('https://ciateq-get-employees.azure-api.net/ciateq-get-employees/get-employees');
                if(employeesData.status !== 200) throw new Error('API Internal Error');
                employeesData = await employeesData.json();
                this.employeesArr = employeesData.response ? [...employeesData.response]:[];
            }catch(error){
                throw error;
            }   
        },
        async deleteEmployee(e){
            const selectedCurp = e.target.parentNode.parentNode.childNodes[1].innerText;
            let confirmDialog = confirm(`Quieres eliminar CURP: ${selectedCurp}?`);
            if(confirmDialog){
                const deleteEmployeeConfig = {
                    method:'POST',
                    body:JSON.stringify({
                        curp:selectedCurp
                    })
                };
                try{
                    let employeeData = await fetch('https://ciateq-delete-employee.azure-api.net/ciateq-delete-employee/delete-employee',deleteEmployeeConfig);
                    if(employeeData.status !== 200) throw new Error('API Internal Error');
                    employeeData = await employeeData.json();
                    if(employeeData.response.output_val === 'DELETED') location.reload();
                }catch(error){
                    throw error;
                }    
            }
        }
    },
    mounted(){
        this.getEmployees();
    }
};
