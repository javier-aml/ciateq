const mainLoginComp = {
    emits:['main-login','register-form'],
    template:`
        <div id="loginWrapper">
            <form>
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
                        <tr v-if="invalidUser">
                            <td>
                                <span class="alert">El usuario no existe</p>
                            </td>
                        </tr>
                        <tr v-if="!invalidUser && !enterButtonClicked">
                        <td>
                            <span class="label">Ingresando...</p>
                        </td>
                    </tr>                        
                        <tr>
                            <td>
                                <button :disabled="toggleEnterButton" @click.prevent="setSession">Entrar</button>&nbsp;
                                <button @click.prevent="registerForm">Registrarse</button>
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
            enterButtonClicked:true,
            invalidUser:false
        }
    },
    methods:{
        async setSession(){
            this.enterButtonClicked = false;
            const setSessionConfig = {
                method:'POST',
                body:JSON.stringify({
                    action:'CREATE',
                    curp:this.curp,
                    employee_no:this.employeeNumber
                })
            };
            try{
                let sessionData = await fetch('https://ciateq-user-session.azure-api.net/ciateq-user-session/user-session',setSessionConfig);
                if(sessionData.status !== 200) throw new Error('API Internal Error');
                sessionData = await sessionData.json();
                if(sessionData.response){
                    localStorage.setItem('ciateqSession',sessionData.response);
                    this.$emit('main-login');
                }else{
                    this.invalidUser = true;
                }    
                this.enterButtonClicked = true;
            }catch(error){
                throw error;
            }            
        },
        registerForm(){
            this.$emit('register-form');
        }
    },
    computed:{
        toggleEnterButton(){
            return this.employeeNumber && this.curpValid && this.enterButtonClicked ? false:true;
        },
        employeeNumberValidation(){
            return this.employeeNumber ? '':'invalid-input';
        },
        curpValidation(){
            const curpRegx = /^[A-Z]{4}.[0-9]{5}.(H|M){0}.[A-Z]{1}.[A-Z]{2}.([0-9]|[A-Z]){0}.[0-9]{0}/;
            this.curpValid = curpRegx.exec(this.curp) ? true:false;
            return this.curpValid ? '':'invalid-input';
        },        
    }
};
