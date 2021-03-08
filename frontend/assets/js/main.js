const app = Vue.createApp({
    template:`
        <div id="loginWrapper" v-if="loadingData">
            <span class="label">Cargando datos...</span>
        </div>            
        <span v-else>
            <main-login @main-login="mainLoginToggleOn" @register-form="registerFormToggle" v-if="!userLogged && !registerForm"></main-login>
            <register-form @cancel-register="cancelRegister" v-if="!userLogged && registerForm"></register-form>
            <user-list @log-out="logOut" v-if="userLogged"></user-list>
        </span>
    `,
    data(){
        return{
            loadingData:true,
            userLogged:false,
            registerForm:false
        }
    },
    methods:{
        mainLoginToggleOn(){
            this.userLogged = true;
        },
        logOut(){
            this.userLogged = false;
        },        
        registerFormToggle(){
            this.registerForm = true;
        },
        cancelRegister(){
            this.registerForm = false;
        },
        async validateSession(){
            const sessionToken = localStorage.getItem('ciateqSession');
            if(sessionToken){
                const setSessionConfig = {
                    method:'POST',
                    body:JSON.stringify({
                        action:'VALIDATE',
                        session_token:sessionToken
                    })
                };
                try{
                    let sessionData = await fetch('https://ciateq-user-session.azure-api.net/ciateq-user-session/user-session',setSessionConfig);
                    if(sessionData.status !== 200) throw new Error('API Internal Error');
                    sessionData = await sessionData.json();
                    if(sessionData.response) this.userLogged = true;
                    this.loadingData = false; 
                }catch(error){
                    throw error;
                }
            }else{
                this.loadingData = false;
            }    
        }
    },
    mounted(){
        this.validateSession();
    }
});
app.component('main-login',mainLoginComp);
app.component('register-form',registerFormComp);
app.component('user-list',userListComp);
app.mount('#app');
