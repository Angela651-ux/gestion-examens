```vue
<template>

    <div class="inscription">

        <div class="inscription-menue">

            <div class="inscr-titre">
                <h1>Gestions des examens</h1>
                <p>Université de Fianarantsoa</p>
            </div>

            <div class="logo">

                <h2>Inscription - Personnel</h2>

                <p>
                    Créer votre compte pour accéder
                    à votre espace personnel correspondant
                    à votre fonction.
                </p>

            </div>

            <div class="iscription-bouton">

                <p>Enseignants</p>
                <p>Secrétaire</p>
                <p>Chef de Mention</p>
                <p>Administrateur</p>

            </div>

            <div class="inscription-footer">

                "Ensemble pour une meilleure
                gestion des examens."

            </div>

        </div>

        <div class="formulaire">

            <form @submit.prevent="inscription">

                <div class="form">

                    <h3>1. Informations personnelles</h3>

                </div>


                <div class="form">

                    <label for="nom">Nom*</label>

                    <input type="text" id="nom" v-model="nom" placeholder="Votre nom" >

                    <p v-if="erreurNom" class="erreur">
                        {{ erreurNom }}
                    </p>

                </div>


                

                <div class="form">

                    <label for="prenom">    Prénom    </label>

                    <input type="text" id="prenom" v-model="prenom" placeholder="Votre prénom"  >

                    <p v-if="erreurPrenom" class="erreur" >
                        {{ erreurPrenom }}
                    </p>

                </div>


        

                <div class="form">

                    <label for="email"> Email* </label>

                    <input type="email"  id="email" v-model="email" placeholder="exemple@gmail.com" >

                    <p v-if="erreurEmail" class="erreur" >
                        {{ erreurEmail }}
                    </p>

                </div>


            

                <div class="form">

                    <label for="telephone"> Téléphone* </label>

                    <input type="tel" id="telephone" v-model="tel" placeholder="Votre numéro de téléphone">

                    <p v-if="erreurTel" class="erreur" >
                        {{ erreurTel }}
                    </p>

                </div>


        

                <div class="form">

                    <label for="datenaiss"> Date de naissance*    </label>

                    <input type="date" id="datenaiss" v-model="datenaiss" >

                    <p v-if="erreurDate" class="erreur" >
                        {{ erreurDate }}
                    </p>

                </div>


            

                <div class="form">

                    <label for="password"> Mot de passe* </label>

                    <input type="password" id="password" v-model="password"  placeholder="Au moins 8 caractères" >

                    <p v-if="erreurPassword" class="erreur">
                        {{ erreurPassword }}
                    </p>

                </div>




                <div class="form">

                    <label for="passwordConfirm">
                        Confirmer le mot de passe*
                    </label>

                    <input
                        type="password"
                        id="passwordConfirm"
                        v-model="confirmpassword"
                        placeholder="Répétez votre mot de passe"
                    >

                    <p
                        v-if="erreurConfirmation"
                        class="erreur"
                    >
                        {{ erreurConfirmation }}
                    </p>

                </div>


                

                <div class="form">

                    <h3>
                        2. Choisir votre fonction
                    </h3>

                </div>


                <div class="form">

                    <label for="fonction">
                        Fonction*
                    </label>

                    <select
                        id="fonction"
                        v-model="role"
                    >

                        <option value="">
                            Sélectionner votre fonction
                        </option>

                        <option value="enseignant">
                            Enseignant
                        </option>

                        <option value="secretaire">
                            Secrétaire
                        </option>

                        <option value="ChefMention">
                            Chef de Mention
                        </option>

                        <option value="admin">
                            Administrateur
                        </option>

                    </select>

                    <p
                        v-if="erreurRole"
                        class="erreur"
                    >
                        {{ erreurRole }}
                    </p>

                </div>


            

                <div class="form">

                    <RouterLink to="/home">
                        Retour
                    </RouterLink>

                    <button type="submit">
                        Suivant
                    </button>

                </div>

            </form>

        </div>

    </div>

</template>


<script setup>

import { ref } from 'vue'
import axios from 'axios'


const nom = ref('')
const prenom = ref('')
const email = ref('')
const tel = ref('')
const datenaiss = ref('')
const password = ref('')
const confirmpassword = ref('')
const role = ref('')



const erreurNom = ref('')
const erreurPrenom = ref('')
const erreurEmail = ref('')
const erreurTel = ref('')
const erreurDate = ref('')
const erreurPassword = ref('')
const erreurConfirmation = ref('')
const erreurRole = ref('')




const inscription = async () => {


    
    erreurNom.value = ''
    erreurPrenom.value = ''
    erreurEmail.value = ''
    erreurTel.value = ''
    erreurDate.value = ''
    erreurPassword.value = ''
    erreurConfirmation.value = ''
    erreurRole.value = ''


    
    if (!nom.value.trim()) {

        erreurNom.value =
            'Le nom est obligatoire.'

        return
    }

    if (!email.value.trim()) {

        erreurEmail.value =
            'L\'email est obligatoire.'

        return
    }


   

    const emailVerification =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    if (!emailVerification.test(email.value)) {

        erreurEmail.value =
            'Veuillez entrer une adresse email valide.'

        return
    }

    if (!tel.value.trim()) {

        erreurTel.value =
            'Le numéro de téléphone est obligatoire.'

        return
    }


    

    const telephoneVerification =
        /^[0-9]+$/


    if (!telephoneVerification.test(tel.value)) {

        erreurTel.value =
            'Le numéro de téléphone doit contenir uniquement des chiffres.'

        return
    }

    if (!datenaiss.value) {

        erreurDate.value =
            'La date de naissance est obligatoire.'

        return
    }


    


    const anneeNaissance =
        Number(datenaiss.value.split('-')[0])



    if (anneeNaissance >= 2010) {

        erreurDate.value =
            'La date de naissance est invalide. L\'année doit être antérieure à 2010.'

        return
    }


    

    if (!password.value) {

        erreurPassword.value =
            'Le mot de passe est obligatoire.'

        return
    }


    if (password.value.length < 8) {

        erreurPassword.value =
            'Le mot de passe doit contenir au moins 8 caractères.'

        return
    }


    if (!confirmpassword.value) {

        erreurConfirmation.value =
            'Veuillez confirmer votre mot de passe.'

        return
    }


    if (
        password.value !==
        confirmpassword.value
    ) {

        erreurConfirmation.value =
            'Les mots de passe ne correspondent pas.'

        return
    }

    if (!role.value) {

        erreurRole.value =
            'Veuillez sélectionner votre fonction.'

        return
    }


  
    try {

        const response = await axios.post(

            'http://localhost:3000/auth/inscription',

            {

                nom: nom.value,

                prenom: prenom.value,

                email: email.value,

                tel: tel.value,

                datenaiss: datenaiss.value,

                password: password.value,

                confirmpassword:
                    confirmpassword.value,

                role: role.value

            }

        )


        

        console.log(response.data)

        alert('Inscription réussie !')


        
        nom.value = ''
        prenom.value = ''
        email.value = ''
        tel.value = ''
        datenaiss.value = ''
        password.value = ''
        confirmpassword.value = ''
        role.value = ''


    } catch (error) {


        console.error(error)


        if (error.response) {

            const message =
                error.response.data.message


            /*
               Si NestJS retourne un tableau
               de messages d'erreur.
            */

            if (Array.isArray(message)) {

                /*
                   Pour le moment on affiche
                   le message backend sous l'email.
                */

                erreurEmail.value =
                    message.join(', ')

            } else {

                erreurEmail.value =
                    message ||
                    'Une erreur est survenue lors de l\'inscription.'
            }

        } else {

            erreurEmail.value =
                'Impossible de contacter le serveur.'
        }

    }

}

</script>
```
