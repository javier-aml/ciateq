const registerFormComp = {
    emits:['cancel-register'],
    template:`
    <div id="registerWrapper">
        <span class="label" v-if="!regionsArr.length">Cargando datos...</span>
        <form v-else>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label for="employee-number">Numero de empleado:</label>
                        </td>
                        <td>
                            <input type="number" name="employee-number" style="width:60px" :class="employeeNumberValidation" v-model.trim="employeeNumber">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="curp">CURP:</label>
                        </td>
                        <td>
                            <input type="password" name="curp" style="width:100px" :class="curpValidation" v-model.trim="curp">
                        </td>
                    </tr>
                    <tr v-if="!curpValid">
                        <td></td>
                        <td>
                            <span class="alert">Formato de CURP incorrecto</span>
                        </td>
                    </tr>                    
                    <tr>
                        <td>
                            <label for="curp-conf">CURP(confirmar):</label>
                        </td>
                        <td>
                            <input type="password" name="curp-conf" style="width:100px" :class="curpConfValidation" v-model.trim="curpConf">
                        </td>
                    </tr>
                    <tr v-if="!curpConfValid">
                        <td></td>
                        <td>
                            <span class="alert">La confirmacion no coincide</span>
                        </td>
                    </tr>                    
                    <tr>
                        <td>
                            <label for="region">Region:</label>
                        </td>
                        <td>
                            <select name="region" :class="regionValidation" v-model="region">
                                <option value=""></option>
                                <option v-for="region in regionsArr" :value="region">{{region}}</option>
                            </select>
                        </td>	
                    </tr>                     
                    <tr>
                        <td>
                            <label for="full-name">Nombre completo:</label>
                        </td>
                        <td>
                            <input type="text" name="full-name" style="width:200px" :class="fullNameValidation" v-model.trim="fullName">
                        </td>
                    </tr>                                        
                    <tr v-if="invalidUser">
                        <td>
                            <span class="alert">Este Numero de empleado/CURP ya esta registrado</p>
                        </td>
                    </tr>
                    <tr v-if="!invalidUser && sendingData">
                        <td>
                            <span class="label">{{sendingData}}</p>
                        </td>
                    </tr>                    
                    <tr>
                        <td>
                            <button @click.prevent="sendFromData" :disabled="toggleSendButton">Enviar</button>&nbsp;
                            <button @click.prevent="cancelRegister" :disabled="this.sendingData">Cancelar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    `,
    data(){
        return{
            employeeNumber:null,
            curp:null,
            curpValid:false,
            curpConfValid:false,
            curpConf:null,
            region:null,
            fullName:null,
            regionsArr:[],
            invalidUser:false,
            sendingData:false
        }
    },
    methods:{
        cancelRegister(){
            this.$emit('cancel-register');
        },
        async getRegions(){
            try{
                let regionsData = await fetch('https://ciateq-get-regions.azure-api.net/ciateq-get-regions/get-regions');
                if(regionsData.status !== 200) throw new Error('API Internal Error');
                regionsData = await regionsData.json();
                for(region of regionsData.response){
                    this.regionsArr.push(region.region);
                }
            }catch(error){
                throw error;
            }    
        },
        async sendFromData(){
            this.sendingData = 'Enviando datos...';
            const setEmployeeConfig = {
                method:'POST',
                body:JSON.stringify({
                    curp:this.curp.toUpperCase(),
                    employee_no:this.employeeNumber,
                    region:this.region,
                    full_name:this.fullName
                })
            };
            try{
                let employeeData = await fetch('https://ciateq-set-employee.azure-api.net/ciateq-set-employee/set-employee',setEmployeeConfig);
                if(employeeData.status !== 200) throw new Error('API Internal Error');    
                employeeData = await employeeData.json();
                this.invalidUser = employeeData.response.output_val === 'EXISTING' ? true:false;
                if(!this.invalidUser){
                    this.sendingData = 'Usuario registrado con exito!';
                    setTimeout(() => {
                        this.cancelRegister();
                        this.sendingData = false;
                    },2000);
                }else{
                    this.sendingData = false;
                }    
            }catch(error){
                throw error;
            }          
        }
    },
    computed:{
        employeeNumberValidation(){
            return this.employeeNumber ? '':'invalid-input';
        },
        curpValidation(){
            const curpRegx = /^[A-Z]{4}.[0-9]{5}.(H|M){0}.[A-Z]{1}.[A-Z]{2}.([0-9]|[A-Z]){0}.[0-9]{0}/;
            this.curpValid = curpRegx.exec(this.curp) ? true:false;
            return this.curpValid ? '':'invalid-input';
        }, 
        curpConfValidation(){
            this.curpConfValid = (this.curp === this.curpConf && this.curpValid) ? true:false;
            return this.curpConfValid ? '':'invalid-input';
        },
        regionValidation(){
            return this.region ? '':'invalid-input';
        },
        fullNameValidation(){
            return this.fullName ? '':'invalid-input';
        },
        toggleSendButton(){
            return (this.employeeNumber && this.curpValid && this.curpConfValid && this.region && this.fullName && !this.sendingData) ? false:true;
        }                
    },
    watch:{
        curp(newVal,oldVal){
            if(newVal !== oldVal && this.invalidUser) this.invalidUser = false;
        }
    },
    mounted(){
        this.getRegions();
    }
}
