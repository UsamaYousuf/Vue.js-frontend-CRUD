<template>
    <div>
        <div action="" class="login mx-auto">
            <h1>Login</h1>
            <input @keyup="checkFormValidity" type="email" class="form-control" placeholder="email" v-model="email" >
            <input @keyup="checkFormValidity" type="text" class="form-control" placeholder="password" v-model="password">
            <button @click="submitForm" class="btn btn-primary" :disabled="loginButtonToggle">{{ buttonValue }}</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            buttonValue: 'Login',
            loginButtonToggle: true,
            email: '',
            password: ''
        }
    },
    methods: {
        checkFormValidity() {
            if (this.email == '' || this.password == '') {
                this.loginButtonToggle = true;
            } else {
                this.loginButtonToggle = false;
            }
        },
        submitForm(){
            this.buttonValue = 'Loading....';
            this.loginButtonToggle = true;

            axios.post(process.env.VUE_APP_BACKEND_API_URL+'/login',{
                'email' : this.email,
                'password' :this.password
            }).
            then(
                (response)=>{
                    alert(JSON.stringify(response));
                }

            ).
            catch(
                (error) =>{
                    alert(JSON.stringify(error.response.data.message));
                }
            ).
            finally(()=>{
                this.buttonValue = 'Login';
                this.loginButtonToggle = false;
            })
            
        }
    }
}
</script>

<style scoped>
.login {
    margin-top: 10%;
    padding: 2%;
    border: solid 1px black;
    text-align: center;
    width: 50%;
    height: 50%;
    background-color: white;
}
.errorMessage {
    color: red;
}
input {
    margin-bottom: 2rem;
}
</style>
