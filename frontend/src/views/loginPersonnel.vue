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
 <select id="fonction" v-model="role">
                        <option value="" disabled>
                            Sélectionner votre fonction
                        </option>
                        <option value="Admin">Administrateur</option>
                        <option value="RS">Responsable des examens</option>
                        <option value="AS">Agent de scolarité</option>
                        <option value="RM">Responsable de Mention</option>
                        <option value="E">Enseignant</option>
                        <option value="surveillant">Surveillant</option>
                        <option value="PJ">Président du jury</option>
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const role = ref('')
const email = ref('')
const password = ref('')

const erreurRole = ref('')
const erreurEmail = ref('')
const erreurPassword = ref('')

const connection = async () => {

  erreurRole.value = ''
  erreurEmail.value = ''
  erreurPassword.value = ''

  if (!role.value) {
    erreurRole.value = 'Veuillez sélectionner votre fonction.'
    return
  }

  if (!email.value.trim()) {
    erreurEmail.value = "L'email est obligatoire."
    return
  }

  const emailverification = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailverification.test(email.value.trim())) {
    erreurEmail.value = 'Veuillez entrer une adresse email valide.'
    return
  }

  if (!password.value.trim()) {
    erreurPassword.value = 'Le mot de passe est obligatoire.'
    return
  }

  if (password.value.length < 8) {
    erreurPassword.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    return
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/auth/connection',
      {
        role: role.value,
        email: email.value.trim(),
        password: password.value
      }
    )

    console.log('Réponse du serveur :', response.data)

    const utilisateur = response.data.utilisateur

    if (!utilisateur) {
      console.error('Les informations utilisateur sont absentes.')
      return
    }

    // Enregistrer les informations de l'utilisateur connecté
    localStorage.setItem(
      'utilisateurConnecte',
      JSON.stringify(utilisateur)
    )

    console.log(
      'Utilisateur enregistré :',
      JSON.parse(localStorage.getItem('utilisateurConnecte'))
    )

    const rolepersonnel= utilisateur.role

    if (
      rolepersonnel === 'Admin' ||
      rolepersonnel === 'RM'
    ) {
      alert('Connexion réussie !')
      router.push('/dashboard')
    } else {
      erreurRole.value = 'Fonction non prise en charge.'
    }

  } catch (error) {

    console.error('Erreur de connexion :', error)

    if (error.response) {
      const message = error.response.data.message

      console.log('Message du serveur :', message)

      if (message === 'Email incorrecte') {
        erreurEmail.value = message
      } else if (message === ' Mot de passse incorrect') {
        erreurPassword.value = message
      } else if (message === " Ce fonction n'est pas attribué a cette email") {
        erreurRole.value = message
      } else {
        erreurRole.value = Array.isArray(message)
          ? message.join(', ')
          : message
      }
    }
  }
}
</script>