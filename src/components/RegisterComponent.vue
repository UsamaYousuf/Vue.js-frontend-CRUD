<template>
    <div>
        
        <div v-show="showRegsiter" action="" class="register mx-auto" >
             <h1>REGISTER</h1>

             <p v-if="successMessage" class="alert alert-success" >{{ successMessage.slice(1,-1) }}&nbsp;

             <RouterLink to="/Login">Login</RouterLink>
             
             </p>
             
             <p v-if="emailError" class="alert alert-danger" >{{ emailError.slice(2,-2) }}</p>
             <p v-if="nameError" class="alert alert-danger" >{{ nameError.slice(2,-2)  }}</p>
             <p v-if="passwordError" class="alert alert-danger" >{{ passwordError.slice(2,-2)  }}</p>
             <p v-if="errorMessage" class="alert alert-danger" >{{ errorMessage }}</p>

            <input type="text" class="form-control" placeholder="email" v-model="email" @keyup="checkValidForm">
            
            <input type="text" class="form-control"  placeholder="name" v-model="name" @keyup="checkValidForm">
            <input type="text" class="form-control"  placeholder="password" v-model="password" @keyup="checkValidForm">
            <input type="text" class="form-control"  placeholder="password" v-model="repeatPassword" @keyup="checkValidForm">
            <button @click="submitForm" class="btn btn-primary" :disabled="registerBtnToggle" @keyup="checkValidForm">{{buttonValue}}</button>
        </div>
    </div>





</template>

<script>

import axios from 'axios';

export default{
    name: 'RegisterComponent',

    data(){
        return{
            name:'',
            email:'',
            password:'',
            repeatPassword:'',
            errorMessage:'',
            buttonValue:'Register',
            emailError :'',
            nameError :'',
            passwordError :'',
            successMessage :'',
            registerBtnToggle: true,
            showRegsiter:true
        };

    },
    mounted(){
        
    },
    methods: {
        checkValidForm(){
            if(this.name !== '' && this.email !== '' && this.repeatPassword !== '' && this.password !== '' ){
                if(this.repeatPassword == this.password ){

                 this.errorMessage = '';
                 this.registerBtnToggle = false;

                 }else{
                    this.errorMessage = 'Passwords donot match';
                    this.registerBtnToggle = true;
                }

            }else{
                this.registerBtnToggle = true;

            }
        },
       submitForm(){
            this.registerBtnToggle = true ;
            this.buttonValue = 'Loading...';
            
            try{
                axios.post( process.env.VUE_APP_BACKEND_API_URL+'/register', {'email': this.email, 'name': this.name, 'password': this.password})
                    .then((response) => { 
            
                            this.successMessage = (JSON.stringify(response.data.message)) ;
                            this.emailError =  '';
                            this.nameError =  '';
                            this.passwordError =  '' ;
                        
                        
                    })
                    .catch((error) => {
                        this.successMessage = '';
                        this.emailError = ((JSON.stringify(error.response.data.message.email))) || '';
                        this.nameError = (JSON.stringify(error.response.data.message.name)) || '';
                        this.passwordError = (JSON.stringify(error.response.data.message.password)) || '' ;
                    })
                    .finally(() => {
                        this.registerBtnToggle = false;
                        this.buttonValue = 'Register';

                });
            }catch(exception){

                this.errorMessage = JSON.stringify(exception);


            }
        }


        
    },
}


</script>

<style scoped>

.register{
    margin-top: 10%;;
    padding: 2%;
    border: solid 1px black;
    text-align: center;
    width: 50%;
    height: 50%;
    background-color: white;
    border-radius: 5%;
    
}
.errorMessage{
    color:red;
}

input{

    margin-bottom:2rem;
}
</style>