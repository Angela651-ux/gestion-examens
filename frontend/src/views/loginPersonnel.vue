<template>
    <div class="login">
        <div class="login-titre">
            <h1>Gestions des Examens</h1>
            <p>Université de Fianarantsoa</p>
        </div>
        <div class="logo">
            <h2> Espace Personnel</h2>
<p>Connectez-Vous pour acceder à votre 
    interface selon votre Fonction
</p>
<p>Enseignant</p>
<p>secretaire</p>
<p>Chef de Mention</p>
<p>Administrateur</p>
        </div>
         <div class="footer">
            <p>Une gestion organisées pour des examens réussie</p>
         </div>
<div class="Login-form">
    <h3>Connexion-Personnel</h3>
    <p>Veillez sélectionner votre Fonction
        et entrez vos identifiant
    </p>

    <div class="formulaie">
        <form @submit.prevent="connection">
            <div class="form-group">
<label for="fonction">Fonction*</label>
<select  id="fonction" v-model="role">
    <option value="">Choisissez votre Fonction</option>
    <option value="enseignant">Enseignant</option>
    <option value="secretaire">Secrétaire</option>
    <option value="ChefMention">Chef de Mention</option>
    <option value="admin">Administrateur</option>
</select>
<p v-if="erreurRole" class="erreur">{{ erreurRole}}</p>


            </div>
            <div class="form-group">
                <label for="email">Adresse e-mail</label>
                <input type="email" id="mail" placeholder="exemple@gmail.com" v-model="email" required>
                <p v-if="erreurEmail" class="erreur">{{ erreurEmail }}</p>
        
            </div>
            <div class="form-group">
                <label for="password">Mot de passe*</label>
                <input type="password" id="password" placeholder="Votre mot de passe" v-model="password" required>
                <p v-if="erreurPassword" class="erreur">{{ erreurPassword }}</p>

            </div>
            <div class="form-group">
                <a href=""> Mot de passe oublié ?</a>
            </div>
            <div class="form-group">
                <button type="submit">Se connecter</button>
            </div>
            <div class="form-group"><p>ou</p></div>
            <div class="form-titre">
                <p>Pas encore de Compte ?</p>
                <RouterLink to="/inscriptionPersonnel">S'inscrire</RouterLink>
            </div>
            <div class="form-titre">
                <RouterLink to="/home">retour a l'acceuil</RouterLink>
            </div>
            

        </form>
    </div>
</div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const  router= useRouter();

const role = ref('')
const email = ref('')
const password = ref('')

const erreurRole = ref('')
const erreurEmail = ref('')
const erreurPassword = ref('')

 const connection = async  () => {

    erreurRole. value = ''
    erreurEmail.value = '' 
    erreurPassword.value = ''
    

    if (!role.value){
        erreurRole = ' Veillez sélectionner votre fonction.'
        return
    }

    if ( !email.value.trim){
        erreurEmail.value = 'L\' email est obligatoire'
        return
    }

    const emailverification =/^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailverification.test(email.value)){
        erreurEmail.value = ' Veuillez entre une adresse email valide .'
        return
    }

     if(!password.value.trim){
        erreurPassword = 'Le mot de passe est obligatoire'
        return
     }

     if(password.value.length < 8 ) {
        erreurPassword.value = 'Le mot de passe doit contenir au moins 8 caractères'
        return
     }

     try {
        const response = await axios.post(
            'http://localhost:3000/auth/connection',
            {
                role: role.value,
                email : email.value,
                password: password.value

            }
        )
        console.log(response.data)

        const roleUtilisateur = response.data.utilisateur.role

         if(roleUtilisateur ==='secretaire'){
            router.push('/dashboard')
         }
         else if(roleUtilisateur === 'chefMention'){
            router.push('/dashboard')
         }
        alert('Connexion réussie!')

     } catch(error){
        console.error(error)

        if ( error.response){
            const message = error.response.data.message

             console.log(message)

             if(message === 'Email incorrecte'){
                erreurEmail.value = message
             }else if ( message === ' Mot de passse incorrect'){
                erreurPassword.value= message
             }else if(message === ' Ce fonction n\' est pas attribué a cette email'){
                erreurRole.value = message

             }

        }
     }
 }
</script>