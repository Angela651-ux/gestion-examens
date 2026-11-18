
<template>
    <div class="inscription">

        <div class="inscription-menue">
            <div class="inscr-titre">
                <h1>Gestion des examens</h1>
                <p>Université de Fianarantsoa</p>
            </div>

            <div class="logo">
                <h2>Inscription - Personnel</h2>
                <p>
                    Créez votre compte pour accéder
                    à votre espace personnel
                </p>
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
                    <label>Numéro utilisateur*</label>
                    <input type="text" v-model="numUtilisateur" readonly>
                </div>

                <div class="form">
                    <label for="nom">Nom*</label>
                    <input
                        type="text"
                        id="nom"
                        v-model="nom"
                        placeholder="Votre nom"
                    >
                    <p v-if="erreurNom" class="erreur">{{ erreurNom }}</p>
                </div>

                <div class="form">
                    <label for="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        v-model="prenom"
                        placeholder="Votre prénom"
                    >
                    <p v-if="erreurPrenom" class="erreur">{{ erreurPrenom }}</p>
                </div>

                <div class="form">
                    <label for="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="exemple@gmail.com"
                    >
                    <p v-if="erreurEmail" class="erreur">{{ erreurEmail }}</p>
                </div>

                <div class="form">
                    <label for="datenaiss">Date de naissance*</label>
                    <input
                        type="date"
                        id="datenaiss"
                        v-model="datenaiss"
                    >
                    <p v-if="erreurDate" class="erreur">{{ erreurDate }}</p>
                </div>

                <div class="form">
                    <label for="password">Mot de passe*</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="Au moins 8 caractères"
                    >
                    <p v-if="erreurPassword" class="erreur">{{ erreurPassword }}</p>
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
                    <p v-if="erreurConfirmation" class="erreur">
                        {{ erreurConfirmation }}
                    </p>
                </div>

                <div class="form">
                    <h3>2. Choisir votre fonction</h3>
                </div>

                <div class="form">
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

                    <p v-if="erreurRole" class="erreur">{{ erreurRole }}</p>
                </div>

                <div class="form">
                    <h3>3. Informations concernant l'établissement</h3>
                </div>

                <div class="form">
                    <label for="etablissement">Établissement</label>

                    <select id="etablissement" v-model="etablissement">
                        <option value="" disabled>
                            Sélectionner votre établissement
                        </option>

                        <option
                            v-for="e in etabliss"
                            :key="e.idetablissement"
                            :value="e.idetablissement"
                        >
                            {{ e.nometablissement }}
                        </option>
                    </select>
                </div>

                <div class="form">
                    <RouterLink to="/home">Retour</RouterLink>
                    <button type="submit" :disabled="chargement">
                        {{ chargement ? 'Inscription en cours...' : 'Suivant' }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const numUtilisateur = ref('')
const nom = ref('')
const prenom = ref('')
const email = ref('')
const datenaiss = ref('')
const password = ref('')
const confirmpassword = ref('')
const role = ref('')
const etablissement = ref('')

const etabliss = ref([])
const chargement = ref(false)

const erreurNom = ref('')
const erreurPrenom = ref('')
const erreurEmail = ref('')
const erreurDate = ref('')
const erreurPassword = ref('')
const erreurConfirmation = ref('')
const erreurRole = ref('')

// Chargement des établissements
const chargerEtablissement = async () => {
    try {
        const reponse = await axios.get(
            'http://localhost:3000/svrpedag/etablissement'
        )

        etabliss.value = reponse.data
        console.log('Établissements chargés :', etabliss.value)

    } catch (erreur) {
        console.error('Erreur de chargement des établissements :', erreur)
    }
}

// Génération du numéro utilisateur
const numUtil = async () => {
    try {
        const reponse = await axios.get(
            'http://localhost:3000/auth/prochainNum'
        )

        numUtilisateur.value = reponse.data.numutilisateur

    } catch (erreur) {
        console.error('Erreur de chargement du numéro :', erreur)
    }
}

onMounted(() => {
    chargerEtablissement()
    numUtil()
})

// Réinitialisation des erreurs
const reinitialiserErreurs = () => {
    erreurNom.value = ''
    erreurPrenom.value = ''
    erreurEmail.value = ''
    erreurDate.value = ''
    erreurPassword.value = ''
    erreurConfirmation.value = ''
    erreurRole.value = ''
}

// Inscription
const inscription = async () => {

    reinitialiserErreurs()

    if (!nom.value.trim()) {
        erreurNom.value = 'Le nom est obligatoire.'
        return
    }

    if (!email.value.trim()) {
        erreurEmail.value = "L'email est obligatoire."
        return
    }

    const emailVerification = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailVerification.test(email.value)) {
        erreurEmail.value = 'Veuillez entrer une adresse email valide.'
        return
    }

    if (!datenaiss.value) {
        erreurDate.value = 'La date de naissance est obligatoire.'
        return
    }

    const anneeNaissance = Number(datenaiss.value.split('-')[0])

    if (anneeNaissance >= 2010) {
        erreurDate.value =
            "La date de naissance est invalide. L'année doit être antérieure à 2010."
        return
    }

    if (!password.value) {
        erreurPassword.value = 'Le mot de passe est obligatoire.'
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

    if (password.value !== confirmpassword.value) {
        erreurConfirmation.value =
            'Les mots de passe ne correspondent pas.'
        return
    }

    if (!role.value) {
        erreurRole.value = 'Veuillez sélectionner votre fonction.'
        return
    }

    if (!numUtilisateur.value) {
        alert("Le numéro utilisateur n'a pas été généré.")
        return
    }

    chargement.value = true

    try {

        const donnees = {
            numutilisateur: numUtilisateur.value,
            nom: nom.value.trim(),
            prenom: prenom.value.trim(),
            emailpersonnel: email.value.trim(),
            datenaiss: datenaiss.value,
            password: password.value,
            confirmpassword: confirmpassword.value,
            rolepersonnel: role.value,
            idetablissement: etablissement.value
                ? Number(etablissement.value)
                : null
        }

        console.log('Données envoyées :', donnees)

        const response = await axios.post(
            'http://localhost:3000/auth/inscription',
            donnees
        )

        console.log('Réponse serveur :', response.data)

        alert('Inscription réussie !')

        // Réinitialisation
        nom.value = ''
        prenom.value = ''
        email.value = ''
        datenaiss.value = ''
        password.value = ''
        confirmpassword.value = ''
        role.value = ''
        etablissement.value = ''

        // Générer un nouveau numéro
        await numUtil()

    } catch (erreur) {

        console.error("Erreur lors de l'inscription :", erreur)

        if (erreur.response) {

            const message = erreur.response.data.message

            if (Array.isArray(message)) {
                erreurEmail.value = message.join(', ')
            } else {
                erreurEmail.value =
                    message || "Une erreur est survenue lors de l'inscription."
            }

        } else {
            erreurEmail.value = 'Impossible de contacter le serveur.'
        }

    } finally {
        chargement.value = false
    }
}
</script>
