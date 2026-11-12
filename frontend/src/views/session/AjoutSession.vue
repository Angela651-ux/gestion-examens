<template>
  <div class="page-ajout-session">

    <!-- En-tête -->
    <div class="entete">
      <div>
        <h1>{{ modeModification ? 'Modifier la session' : 'Creer la Session' }}</h1>
        <p>Enregistrez une nouvelle période d'organisation des examens.</p>
      </div>

      <button class="btn-retour" @click="$router.push('/dashboard/session')">
        ← Retour
      </button>
    </div>

    <!-- Formulaire -->
    <div class="formulaire-container">

      <div class="formulaire-titre">
        <div class="icone-titre">📅</div>
        <div>
          <h2>Informations de la session</h2>
          <p>Veuillez remplir les informations ci-dessous.</p>
        </div>
      </div>

      <form @submit.prevent="enregistrerSession">

        <div class="form-grid">

        <div class="champ">
            <label>Numero Session *</label>
            <input type="text" v-model="numSession" readonly/>
          </div>

          <div class="champ">
            <label>Intitulé de la session *</label>
            <input type="text"  v-model="libSession" placeholder="Ex : Session normale S1" required/>
             <p v-if="erreurslib" class="erreur">{{ erreurslib}}</p>
          </div>

          <div class="champ">
            <label>Type de session *</label>
            <select v-model="typeSession" required>
              <option value="" disabled>Sélectionner le type</option>
              <option value="Normale">Session normale</option>
              <option value="Rattrapage">Session de rattrapage</option>
            </select>
             <p v-if="erreurtype" class="erreur">{{ erreurtype}}</p>
          </div>

          <div class="champ">
  <label>Année universitaire *</label>
  <input
    type="text"
    v-model="annerSession"
    placeholder="Ex : 2026-2027"
    @input="modifierAnnee"
    @blur="validerAnnee"
    required
  />
  <p v-if="erreurAnner" class="erreur">
    {{ erreurAnner }}
  </p>
</div>


          <div class="champ">
  <label>Date de début *</label>
  <input
    type="date"
    v-model="datedebSession"
    :min="dateMinDebut"
    :max="dateMaxDebut"
    @change="validerDates"
    required
  />
  <p v-if="erreurdatedebut" class="erreur">
    {{ erreurdatedebut }}
  </p>
</div>

          <div class="champ">
  <label>Date de fin *</label>
  <input
    type="date"
    v-model="dateFinSession"
    :min="dateMinFin"
    :max="dateMaxFin"
    @change="validerDates"
    required
  />
  <p v-if="erreurdatefin" class="erreur">
    {{ erreurdatefin }}
  </p>
</div>
          
          <div class="champ champ-complet">
            <label>Description</label>
            <select v-model="statutSession" required>
              <option value="" disabled>Sélectionner un statut</option>
              <option value="En cours">En cours</option>
              <option value="A venir">A venir</option>
              <option value="Effectuée">Efféctué</option>
            </select>
             <p v-if="erreurstatut" class="erreur">{{ erreurstatut}}</p>
          </div>

        </div>

        <p v-if="erreurGenerale" class="erreur">
  {{ erreurGenerale }}
</p>

        <!-- Boutons -->
        <div class="actions">
          <button
            type="button"
            class="btn-annuler"
            @click="reinitialiser"
          >
            Annuler
          </button>


          <button type="submit" class="btn-enregistrer">
    {{ modeModification
        ? 'Enregistrer les modifications'
        : 'Enregistrer la session' }}
</button>
        </div>

      </form>
    </div>

  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();



const numSession = ref('');
const libSession = ref('');
const typeSession = ref('');
const annerSession = ref('');
const datedebSession = ref('');
const dateFinSession = ref('');
const statutSession = ref('');

const modeModification = ref(false);
const idSession=ref(null);

const erreurslib = ref('');
const erreurAnner = ref('');
const erreurdatedebut = ref('');
const erreurdatefin = ref('');
const erreurtype = ref('');
const erreurstatut = ref('');
const erreurNum = ref('');
const erreurGenerale = ref('');

const anneeManuelle = ref(false);


const chargerModifierSession = async () => {
    try {
        const reponse = await axios.get(
            'http://localhost:3000/svrorg/listeSession'
        );

        const session = reponse.data.find(
            s => String(s.idsession) === String(idSession.value)
        );

        if (!session) {
            alert('Session introuvable');
            router.push({ name: 'creeSession' });
            return;
        }

        numSession.value = session.numsession;
        libSession.value = session.libelesession;
        typeSession.value = session.typesession;
        annerSession.value = session.annersession;

        datedebSession.value =
            session.datedebutsession?.substring(0, 10);

        dateFinSession.value =
            session.datefinsession?.substring(0, 10);

        statutSession.value = session.statutsession;

    } catch (erreur) {
        console.error('Erreur de chargement :', erreur);
    }
};

async function chargerProchainCodeSession() {
    try {
        const response = await axios.get(
            'http://localhost:3000/svrorg/prochainCodeSession'
        );

        numSession.value = response.data.numsession;

    } catch (error) {
        console.error(
            'Erreur de chargement du numéro :',
            error
        );

        erreurNum.value =
            'Impossible de charger le numéro de session.';
    }
}



onMounted(async () => {
    console.log('ID reçu dans URL :', route.params.id);

    if (route.params.id) {
        modeModification.value = true;
        idSession.value = route.params.id;

        await chargerModifierSession();

    } else {
        modeModification.value = false;
        idSession.value = null;

        await chargerProchainCodeSession();
    }
});



function obtenirAnnees() {

    const correspondance = annerSession.value.match(
        /^(\d{4})-(\d{4})$/
    );

    if (!correspondance) {
        return null;
    }

    const debut = Number(correspondance[1]);
    const fin = Number(correspondance[2]);

    // Les deux années doivent être consécutives
    if (fin !== debut + 1) {
        return null;
    }

    return {
        debut,
        fin
    };
}




// Première date autorisée
const dateMinDebut = computed(() => {

    const annees = obtenirAnnees();

    return annees
        ? `${annees.debut}-01-01`
        : undefined;
});


const dateMaxDebut = computed(() => {

    const annees = obtenirAnnees();

    return annees
        ? `${annees.fin}-12-31`
        : undefined;
});



const dateMinFin = computed(() => {

    return datedebSession.value || undefined;
});


// Dernière date autorisée pour la fin
const dateMaxFin = computed(() => {

    const annees = obtenirAnnees();

    return annees
        ? `${annees.fin}-12-31`
        : undefined;
});



function modifierAnnee() {

    // L'utilisateur saisit lui-même l'année
    anneeManuelle.value = true;

    erreurAnner.value = '';
    erreurGenerale.value = '';

    validerAnnee();
}



function validerAnnee() {

    if (!annerSession.value.trim()) {

        erreurAnner.value =
            "L'année universitaire est obligatoire.";

        return false;
    }

    if (!obtenirAnnees()) {

        erreurAnner.value =
            "Format incorrect. Exemple : 2026-2027.";

        return false;
    }

    erreurAnner.value = '';

    return true;
}



function verifierCorrespondanceDates() {

    const annees = obtenirAnnees();

    if (!annees) {

        erreurAnner.value =
            "Année universitaire invalide.";

        return false;
    }

    const anneesAutorisees = [
        annees.debut,
        annees.fin
    ];


    // Vérification de la date de début
    if (datedebSession.value) {

        const anneeDebut = Number(
            datedebSession.value.substring(0, 4)
        );

        if (!anneesAutorisees.includes(anneeDebut)) {

            erreurdatedebut.value =
                `La date doit appartenir à ${annees.debut} ou ${annees.fin}.`;

            return false;
        }
    }


    // Vérification de la date de fin
    if (dateFinSession.value) {

        const anneeFin = Number(
            dateFinSession.value.substring(0, 4)
        );

        if (!anneesAutorisees.includes(anneeFin)) {

            erreurdatefin.value =
                `La date doit appartenir à ${annees.debut} ou ${annees.fin}.`;

            return false;
        }
    }


    // La date de fin doit être postérieure
    // à la date de début
    if (
        datedebSession.value &&
        dateFinSession.value &&
        dateFinSession.value <= datedebSession.value
    ) {

        erreurdatefin.value =
            'La date de fin doit être postérieure à la date de début.';

        return false;
    }


    erreurAnner.value = '';
    erreurdatedebut.value = '';
    erreurdatefin.value = '';

    return true;
}


// ======================================
// 9. VALIDATION DES DATES
// ======================================

function validerDates() {

    erreurGenerale.value = '';

    erreurdatedebut.value = '';
    erreurdatefin.value = '';


    // Vérifier la date de début
    if (!datedebSession.value) {

        erreurdatedebut.value =
            'La date de début est obligatoire.';

        return false;
    }


    // Génération automatique de l'année universitaire
    if (!anneeManuelle.value) {

        const anneeDebut = Number(
            datedebSession.value.substring(0, 4)
        );

        annerSession.value =
            `${anneeDebut}-${anneeDebut + 1}`;

        erreurAnner.value = '';
    }


    // Vérifier que l'année universitaire est correcte
    if (!validerAnnee()) {
        return false;
    }


    // Vérifier la date de fin
    if (!dateFinSession.value) {

        erreurdatefin.value =
            'La date de fin est obligatoire.';

        return false;
    }


    // Vérifier que la date de fin est après le début
    if (dateFinSession.value <= datedebSession.value) {

        erreurdatefin.value =
            'La date de fin doit être postérieure à la date de début.';

        return false;
    }


    // Vérifier l'appartenance des dates à l'année universitaire
    return verifierCorrespondanceDates();
}


// ======================================
// 10. VÉRIFICATION DE TOUS LES CHAMPS
// ======================================

function validerFormulaire() {

    let valide = true;

    erreurGenerale.value = '';


    // Numéro de session
    if (!numSession.value) {

        erreurNum.value =
            'Le numéro de session est introuvable.';

        valide = false;

    } else {

        erreurNum.value = '';
    }


    // Intitulé
    if (!libSession.value.trim()) {

        erreurslib.value =
            "L'intitulé est obligatoire.";

        valide = false;

    } else {

        erreurslib.value = '';
    }


    // Type de session
    if (
        !['Normale', 'Rattrapage'].includes(
            typeSession.value
        )
    ) {

        erreurtype.value =
            'Veuillez sélectionner un type valide.';

        valide = false;

    } else {

        erreurtype.value = '';
    }


    // Année universitaire
    if (!validerAnnee()) {

        valide = false;
    }


    // Dates obligatoires
    if (!datedebSession.value) {

        erreurdatedebut.value =
            'La date de début est obligatoire.';

        valide = false;
    }

    if (!dateFinSession.value) {

        erreurdatefin.value =
            'La date de fin est obligatoire.';

        valide = false;
    }


    // Vérification de la cohérence des dates
    if (
        datedebSession.value &&
        dateFinSession.value
    ) {

        if (
            !verifierCorrespondanceDates()
        ) {

            valide = false;
        }
    }


    // Statut
    if (
        !['En cours', 'A venir', 'Effectuée'].includes(
            statutSession.value
        )
    ) {

        erreurstatut.value =
            'Veuillez sélectionner un statut valide.';

        valide = false;

    } else {

        erreurstatut.value = '';
    }


    return valide;
}


// ======================================
// 11. ENREGISTREMENT DE LA SESSION
// ======================================

async function enregistrerSession() {

    // Vérification avant l'enregistrement
    if (!validerFormulaire()) {

        return;
    }


    try {

        // Données envoyées au backend
        const donnees = {

            numsession: numSession.value,

            libelesession: libSession.value.trim(),

            typesession: typeSession.value,

            annersession: annerSession.value,

            datedebutsession: datedebSession.value,

            datefinsession: dateFinSession.value,

            statutsession: statutSession.value

        };


        console.log(
            'Données envoyées :',
            donnees
        );

        if(modeModification.value){
            await axios.put(
    `http://localhost:3000/svrorg/modifierSession/${idSession.value}`,
    donnees
);
            alert ('Session Modifier avec Succès !')
        }else{


        // Requête POST vers l'API Gateway
        const response = await axios.post(
            'http://localhost:3000/svrorg/enregistrerSession',
            donnees
        );


        console.log(
            'Réponse du serveur :',
            response.data
        );


        alert(
            'Session enregistrée avec succès !'
        );
        }

        // Retour vers la liste des sessions
        router.push('/dashboard/session');


    } catch (error) {

        console.error(
            "Erreur d'enregistrement :",
            error
        );


        if (error.response) {

            erreurGenerale.value =
                error.response.data?.message ||
                "Erreur lors de l'enregistrement.";

        } else {

            erreurGenerale.value =
                "Impossible de contacter le serveur.";
        }
    }

}


// ======================================
// 12. RÉINITIALISATION DU FORMULAIRE
// ======================================

function reinitialiser() {

    // Vider les champs
    libSession.value = '';
    typeSession.value = '';
    annerSession.value = '';
    datedebSession.value = '';
    dateFinSession.value = '';
    statutSession.value = '';


    // Réinitialiser les erreurs
    erreurslib.value = '';
    erreurAnner.value = '';
    erreurdatedebut.value = '';
    erreurdatefin.value = '';
    erreurtype.value = '';
    erreurstatut.value = '';
    erreurNum.value = '';
    erreurGenerale.value = '';


    // Revenir au mode automatique
    anneeManuelle.value = false;


    // Charger un nouveau numéro
    chargerProchainCodeSession();
}
</script>

<style scoped>
.page-ajout-session {
  min-height: 100vh;
  background: #f5f7fb;
  padding: 25px;
}

/* En-tête */
.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.entete h1 {
  font-size: 25px;
  color: #1e293b;
  margin-bottom: 8px;
}

.entete p {
  color: #64748b;
  font-size: 14px;
}

.btn-retour {
  padding: 10px 16px;
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
  border-radius: 7px;
  cursor: pointer;
}

/* Conteneur formulaire */
.formulaire-container {
  background: white;
  max-width: 950px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.05);
}

/* Titre formulaire */
.formulaire-titre {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 22px;
  margin-bottom: 25px;
  border-bottom: 1px solid #e2e8f0;
}

.icone-titre {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  border-radius: 10px;
  font-size: 23px;
}

.formulaire-titre h2 {
  color: #1e293b;
  font-size: 19px;
  margin-bottom: 5px;
}

.formulaire-titre p {
  color: #64748b;
  font-size: 13px;
}

/* Champs */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.champ label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.champ input,
.champ select,
.champ textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  background: white;
}

.champ input:focus,
.champ select:focus,
.champ textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #dbeafe;
}

.champ-complet {
  grid-column: span 2;
}

.champ textarea {
  resize: vertical;
}

/* Boutons */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid #e2e8f0;
}

.btn-annuler,
.btn-enregistrer {
  padding: 12px 20px;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.btn-annuler {
  background: #f1f5f9;
  color: #475569;
}

.btn-enregistrer {
  background: #2563eb;
  color: white;
}

.btn-enregistrer:hover {
  background: #1d4ed8;
}

.btn-annuler:hover {
  background: #e2e8f0;
}

/* Responsive */
@media (max-width: 650px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .champ-complet {
    grid-column: span 1;
  }

  .entete {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .formulaire-container {
    padding: 18px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>